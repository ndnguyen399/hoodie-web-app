/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useApplicationContext } from "../../../hooks/useApplicationContext";
import { useAppParameters } from "../../../hooks/useAppParameters";
import { useTranslation } from "../../../hooks/useTranslation";
import type { PageProps, PageState } from "./VoucherRegistration.types";
import Constants from "../../common/Constants";
import type { VoucherSubmitApplicationModel } from "../../common/Models";
import { VoucherSubmitViewApi } from "../../api/VoucherSubmitViewApi";

/**
 * useStore
 * 
 * @param props 
 * @returns useStore
 */
export const useStore = (props: PageProps) => {
    const { t } = useTranslation();
    const context = useApplicationContext();
    const params = useAppParameters();
    const navigate = useNavigate();

    const [state, setState] = useState<PageState>({
        voucherSubmitApplicationModel: {},
        // skillTypeAC: {},
        // ageGroupAC: {},
        loading: false,
        isSubmitting: false,
        requestType: params.get("requestType") ?? Constants.REUEST_TYPE_INITIAL
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                // action.items.skillType.handleOpen();
                // action.items.ageGroup.handleOpen();
                try {
                    // const response = await new CategorySubmitViewApi().initial({
                    //     requestType: stateRef.current.requestType,
                    //     model: {
                    //         categoryId: Number(params.get("categoryId"))!
                    //     }
                    // });
                    setState(prev => ({
                        ...prev,
                        // categorySubmitApplicationModel: response.data?.search?.[0]
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
        onChangeField: (item: string, newValue: any) => {
            const before: VoucherSubmitApplicationModel = stateRef.current.voucherSubmitApplicationModel!;
            const voucherSubmitApplicationModel: VoucherSubmitApplicationModel = {
                ...before,
                [item]: newValue
            };
            setState(prev => ({
                ...prev,
                voucherSubmitApplicationModel
            }));
        },
        back: {
            execute: () => {
                navigate(-1)
            }
        },
        // reset: {
        //     execute: () => {
        //         setState(prev => ({
        //             ...prev,
        //             categorySubmitApplicationModel: {},
        //             skillTypeAC: {},
        //             ageGroupAC: {}
        //         }));
        //     }
        // },
        submitVoucher: {
            execute: (event: React.FormEvent<HTMLFormElement>) => {
                context.overlay
                .open()
                .execute(async () => {
                    event.preventDefault();
                    setState(prev => ({ ...prev, isSubmitting: true }));
                    try {
                        const result = await new VoucherSubmitViewApi().submit({
                            requestType: stateRef.current.requestType,
                            model: stateRef.current.voucherSubmitApplicationModel!
                        });
                        const resultModel = result.data;
                        let message = '';
                        for (const item of resultModel) {
                            message += `${item.code}: ${item.message}\n`;
                        }
                        await context.navigation.openInformationDialog(message);
                        action.back.execute();
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
            // skillType: {
            //     onChange: async (
            //         event: SyntheticEvent<Element, Event>, newValue: CodeSearchDomainModel | null
            //     ) => {
            //         setState(prev => ({
            //             ...prev,
            //             categorySubmitApplicationModel: {
            //                 ...prev.categorySubmitApplicationModel,
            //                 skillType: newValue?.codeName
            //             }
            //         }));
            //     },
            //     handleOpen: async () => {
            //         if (stateRef.current.skillTypeAC?.search?.length) {
            //             return;
            //         }
            //         context.overlay
            //             .open()
            //             .execute(async () => {
            //                 try {
            //                     const response = await new CodeSearchViewApi().search({
            //                         codeCd: Constants.CODE_SKILL_TYPE
            //                     });
            //                     setState(prev => ({
            //                         ...prev,
            //                         skillTypeAC: response.data
            //                     }));
            //                 } catch (error: any) {
            //                     const responseData = error?.payload;
            //                     if (responseData) {
            //                         let message = '';
            //                         if (responseData.data?.length) {
            //                             for (const item of responseData.data) {
            //                                 message += `${item.code}: ${item.message}\n`;
            //                             }
            //                         } else {
            //                             message = responseData.message;
            //                         }
            //                         await context.navigation.openErrorDialog(message);
            //                     } else {
            //                         await context.navigation.openErrorDialog(t("label-internalServerError"));
            //                     }
            //                 }
            //             });
            //     },
            // },
            // ageGroup: {
            //     onChange: async (
            //         event: SyntheticEvent<Element, Event>, newValue: CodeSearchDomainModel | null
            //     ) => {
            //         setState(prev => ({
            //             ...prev,
            //             categorySubmitApplicationModel: {
            //                 ...prev.categorySubmitApplicationModel,
            //                 ageGroup: newValue?.codeName
            //             }
            //         }));
            //     },
            //     handleOpen: async () => {
            //         if (stateRef.current.skillTypeAC?.search?.length) {
            //             return;
            //         }
            //         context.overlay
            //             .open()
            //             .execute(async () => {
            //                 try {
            //                     const response = await new CodeSearchViewApi().search({
            //                         codeCd: Constants.CODE_AGE_GROUP
            //                     });
            //                     setState(prev => ({
            //                         ...prev,
            //                         ageGroupAC: response.data
            //                     }));
            //                 } catch (error: any) {
            //                     const responseData = error?.payload;
            //                     if (responseData) {
            //                         let message = '';
            //                         if (responseData.data?.length) {
            //                             for (const item of responseData.data) {
            //                                 message += `${item.code}: ${item.message}\n`;
            //                             }
            //                         } else {
            //                             message = responseData.message;
            //                         }
            //                         await context.navigation.openErrorDialog(message);
            //                     } else {
            //                         await context.navigation.openErrorDialog(t("label-internalServerError"));
            //                     }
            //                 }
            //             });
            //     },
            // },
        }
    }), []);

    return {
        t,
        state,
        action
    };
};