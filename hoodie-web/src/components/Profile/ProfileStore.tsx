/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState, type SyntheticEvent } from "react";
import { useApplicationContext } from "../../hooks/useApplicationContext";
import { useTranslation } from "../../hooks/useTranslation";
import type { PageProps, PageState } from "./Profile.types";
import Constants from "../common/Constants";
import { useNavigate } from "react-router-dom";
import { ProfileSubmitViewApi } from "../api/ProfileSubmitViewApi";
import type { CodeSearchDomainModel, ProfileDomainModel, UserAddressInitialApplicationModel } from "../common/Models";
import { CodeSearchViewApi } from "../api/CodeSearchViewApi";
import { UserAddressSubmitViewApi } from "../api/UserAddressSubmitViewApi";

/**
 * useStore
 * 
 * @param props 
 * @returns useStore
 */
export const useStore = (props: PageProps) => {
    const { t } = useTranslation();
    const context = useApplicationContext();
    const navigate = useNavigate();

    const [state, setState] = useState<PageState>({
        profileDomainModel: {},
        userAddressesDomainModel: {},
        images: [],
        genderAC: {},
        activeTab: 0,
        editing: false,
        addressFormOpen: false,
        editingAddress: false,
        userAddressInitialApplicationModel: {},
        loading: false,
        isSubmitting: false,
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);


    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                try {
                    const responseOfProfile = await new ProfileSubmitViewApi().initial({
                        requestType: Constants.REUEST_TYPE_INITIAL,
                        model: {}
                    });
                    const responseOfUserAddress = await new UserAddressSubmitViewApi().initial({
                        requestType: Constants.REUEST_TYPE_INITIAL,
                        model: {}
                    });
                    console.log("responseOfUserAddress: ", responseOfUserAddress.data?.search)
                    setState(prev => ({
                        ...prev,
                        profileDomainModel: responseOfProfile.data?.search?.[0],
                        userAddressesDomainModel: responseOfUserAddress.data
                    }));
                } catch (error: any) {
                    const responseData = error?.payload;
                    if (responseData) {
                        let message = '';
                        if (responseData.data?.length) {
                            for (const item of responseData.data) {
                                message += `${item.code}: ${item.message}\n`;
                            }
                        } else {
                            message = responseData.message;
                        }
                        await context.navigation.openErrorDialog(message);
                    } else {
                        await context.navigation.openErrorDialog(t("label-internalServerError"));
                    }
                    navigate(-1)
                }
            });
        },
        setActiveTab: (tab: number) => {
            setState(prev => ({ ...prev, activeTab: tab }));
        },
        setIsEditing: (newValue: boolean) => {
            setState(prev => ({ ...prev, editing: newValue }));
        },
        openAddressForm: () => {
            setState(prev => ({
                ...prev,
                addressFormOpen: true,
                editingAddress: true,
            }));
        },
        closeAddressForm: () => {
            setState(prev => ({
                ...prev,
                addressFormOpen: false,
                editingAddress: false,
            }));
        },
        onChangeField: (item: string, newValue: any) => {
            const before: ProfileDomainModel = stateRef.current.profileDomainModel!;
            const profileDomainModel: ProfileDomainModel = {
                ...before,
                [item]: newValue
            };
            setState(prev => ({
                ...prev,
                profileDomainModel
            }));
        },
        onChangeAddressForm: (item: string, newValue: any) => {
            const before: UserAddressInitialApplicationModel = stateRef.current.userAddressInitialApplicationModel!;
            const userAddressInitialApplicationModel: UserAddressInitialApplicationModel = {
                ...before,
                [item]: newValue
            };
            setState(prev => ({
                ...prev,
                userAddressInitialApplicationModel
            }));
        },
        onChangeFile: (files: File[]) => {
            if (!files || files.length === 0) return;

            // Tạo danh sách object cho tất cả các file được chọn
            const newImages = files.map(file => ({
                file,
                name: file.name,
                isNew: true,
                // Tạo URL tạm thời cho từng file để có thể preview nếu cần
                previewUrl: URL.createObjectURL(file)
            }));

            // Lấy URL preview của bức ảnh đầu tiên để làm avatar đại diện
            const firstAvatarPreview = newImages[0].previewUrl;

            setState(prev => ({
                ...prev,
                images: [
                    ...(prev.images || []),
                    ...newImages
                ],
                profileDomainModel: {
                    ...prev.profileDomainModel!,
                    // Cập nhật avatarUrl bằng ảnh đầu tiên trong danh sách vừa chọn
                    avatarUrl: firstAvatarPreview
                }
            }));
        },
        submitSaveProfile: {
            execute: () => {
                context.overlay
                .open()
                .execute(async () => {
                    setState(prev => ({ ...prev, isSubmitting: true }));
                    try {
                        const uploadFiles = stateRef.current.images
                            ?.filter(image => image.isNew)
                            .map(image => image.file!)
                        ?? [];
                        
                        const result = await new ProfileSubmitViewApi().submit({
                            requestType: Constants.REUEST_TYPE_UPDATE,
                            model: stateRef.current.profileDomainModel!
                            }, 
                            // stateRef.current.images?? []
                            uploadFiles
                        );
                        const resultModel = result.data;
                        let message = '';
                        for (const item of resultModel) {
                            message += `${item.code}: ${item.message}\n`;
                        }
                        await context.navigation.openInformationDialog(message);
                        // action.back.execute();
                        // console.log("user: ", stateRef.current.profileDomainModel);
                        // console.log("image: ", stateRef.current.images);
                    } catch (error: any) {
                        const responseData = error?.payload;
                        if (responseData) {
                            let message = '';
                            if (responseData.data?.length) {
                                for (const item of responseData.data) {
                                    message += `${item.code}: ${item.message}\n`;
                                }
                            } else {
                                message = responseData.message;
                            }
                            await context.navigation.openErrorDialog(message);
                        } else {
                            await context.navigation.openErrorDialog(t("label-internalServerError"));
                        }
                    } finally {
                        setState(prev => ({
                            ...prev,
                            isSubmitting: false
                        }));
                    }
                });
            }
        },
        submitAddressForm: {
            execute: () => {
                context.overlay
                .open()
                .execute(async () => {
                    setState(prev => ({ ...prev, isSubmitting: true }));
                    try {
                        // const result = await new UserAddressSubmitViewApi().submit({
                        //     requestType: Constants.REUEST_TYPE_CREATE,
                        //     model: stateRef.current.userAddressInitialApplicationModel!
                        //     }
                        // );
                        const result = await new UserAddressSubmitViewApi().submit({
                            requestType: Constants.REUEST_TYPE_CREATE,
                            model: stateRef.current.userAddressInitialApplicationModel!
                        });
                        const resultModel = result.data;
                        let message = '';
                        for (const item of resultModel) {
                            message += `${item.code}: ${item.message}\n`;
                        }
                        await context.navigation.openInformationDialog(message);
                        action.closeAddressForm();
                    } catch (error: any) {
                        const responseData = error?.payload;
                        if (responseData) {
                            let message = '';
                            if (responseData.data?.length) {
                                for (const item of responseData.data) {
                                    message += `${item.code}: ${item.message}\n`;
                                }
                            } else {
                                message = responseData.message;
                            }
                            await context.navigation.openErrorDialog(message);
                        } else {
                            await context.navigation.openErrorDialog(t("label-internalServerError"));
                        }
                    } finally {
                        setState(prev => ({
                            ...prev,
                            isSubmitting: false
                        }));
                    }
                });
            }
        },
        items: {
            gender: {
                onChange: async (
                    event: SyntheticEvent<Element, Event>, newValue: CodeSearchDomainModel | null
                ) => {
                    setState(prev => ({
                        ...prev,
                        profileDomainModel: {
                            ...prev.profileDomainModel,
                            gender: newValue?.codeName
                        }
                    }));
                },
                handleOpen: async () => {
                    if (stateRef.current.genderAC?.search?.length) {
                        return;
                    }
                    context.overlay
                        .open()
                        .execute(async () => {
                            try {
                                const response = await new CodeSearchViewApi().search({
                                    codeCd: Constants.CODE_GENDER
                                });
                                setState(prev => ({
                                    ...prev,
                                    genderAC: response.data
                                }));
                            } catch (error: any) {
                                const responseData = error?.payload;
                                if (responseData) {
                                    let message = '';
                                    if (responseData.data?.length) {
                                        for (const item of responseData.data) {
                                            message += `${item.code}: ${item.message}\n`;
                                        }
                                    } else {
                                        message = responseData.message;
                                    }
                                    await context.navigation.openErrorDialog(message);
                                } else {
                                    await context.navigation.openErrorDialog(t("label-internalServerError"));
                                }
                            }
                        });
                },
            },
        }
    }), []);

    return {
        t,
        state,
        action
    };
};