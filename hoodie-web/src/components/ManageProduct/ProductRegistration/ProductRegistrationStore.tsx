/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState, type SyntheticEvent } from "react";
import { useApplicationContext } from "../../../hooks/useApplicationContext";
import { useAppParameters } from "../../../hooks/useAppParameters";
import { useTranslation } from "../../../hooks/useTranslation";
import type { PageProps, PageState } from "./ProductRegistration.types";
// import { CodeSearchViewApi } from "../../api/CodeSearchViewApi";
import Constants from "../../common/Constants";
// import type { CategorySubmitApplicationModel, CodeSearchDomainModel } from "../../common/Models";
// import type { ICommandBarItemProps } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import type { CodeSearchDomainModel, ProductSubmitApplicationModel } from "../../common/Models";
import { CategorySearchViewApi } from "../../api/CategorySearchViewApi";
import { CodeSearchViewApi } from "../../api/CodeSearchViewApi";
import { ProductSubmitViewApi } from "../../api/ProductSubmitViewApi";
// import { CategorySubmitViewApi } from "../../api/CategorySubmitViewApi";

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
        productSubmitApplicationModel: {},
        images: [],
        skillLogicAC: {},
        skillCreativeAC: {},
        skillStemAC: {},
        skillMotorAC: {},
        skillSocialAC: {},
        categoryAC: {},
        loading: false,
        isSubmitting: false,
        requestType: params.get("requestType") ?? Constants.REUEST_TYPE_INITIAL
        // ribbonItem: []
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                action.items.skillLogic.handleOpen();
                action.items.skillCreative.handleOpen();
                action.items.skillStem.handleOpen();
                action.items.skillMotor.handleOpen();
                action.items.skillSocial.handleOpen();
                action.items.category.handleOpen();
                try {
                    const response = await new ProductSubmitViewApi().initial({
                        requestType: stateRef.current.requestType,
                        model: {
                            productId: Number(params.get("productId"))!
                        }
                    });
                    setState(prev => ({
                        ...prev,
                        productSubmitApplicationModel: response.data?.search?.[0],
                        images: [...(response.data?.search?.[0]?.listImages || [])]
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
            const before: ProductSubmitApplicationModel = stateRef.current.productSubmitApplicationModel!;
            const productSubmitApplicationModel: ProductSubmitApplicationModel = {
                ...before,
                [item]: newValue
            };
            setState(prev => ({
                ...prev,
                productSubmitApplicationModel
            }));
        },
        onChangeFile: (item: string, newValue: File[]) => {
            setState(prev => ({
                ...prev,
                [item]: [...(prev.images || []), ...newValue]
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
        submitProduct: {
            execute: (event: React.FormEvent<HTMLFormElement>) => {
                context.overlay
                .open()
                .execute(async () => {
                    event.preventDefault();
                    setState(prev => ({ ...prev, isSubmitting: true }));
                    try {
                        const result = await new ProductSubmitViewApi().submit({
                            requestType: stateRef.current.requestType,
                            model: stateRef.current.productSubmitApplicationModel!
                        }, stateRef.current.images?? []);
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
            skillLogic: {
                onChange: async (
                    event: SyntheticEvent<Element, Event>, newValue: CodeSearchDomainModel | null
                ) => {
                    setState(prev => ({
                        ...prev,
                        productSubmitApplicationModel: {
                            ...prev.productSubmitApplicationModel,
                            skillLogic: newValue?.codeName
                        }
                    }));
                },
                handleOpen: async () => {
                    if (stateRef.current.skillLogicAC?.search?.length) {
                        return;
                    }
                    context.overlay
                        .open()
                        .execute(async () => {
                            try {
                                const response = await new CodeSearchViewApi().search({
                                    codeCd: Constants.CODE_SKILL_IMPACT_INDEX
                                });
                                setState(prev => ({
                                    ...prev,
                                    skillLogicAC: response.data
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
            skillCreative: {
                onChange: async (
                    event: SyntheticEvent<Element, Event>, newValue: CodeSearchDomainModel | null
                ) => {
                    setState(prev => ({
                        ...prev,
                        productSubmitApplicationModel: {
                            ...prev.productSubmitApplicationModel,
                            skillCreative: newValue?.codeName
                        }
                    }));
                },
                handleOpen: async () => {
                    if (stateRef.current.skillCreativeAC?.search?.length) {
                        return;
                    }
                    context.overlay
                        .open()
                        .execute(async () => {
                            try {
                                const response = await new CodeSearchViewApi().search({
                                    codeCd: Constants.CODE_SKILL_IMPACT_INDEX
                                });
                                setState(prev => ({
                                    ...prev,
                                    skillCreativeAC: response.data
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
            skillStem: {
                onChange: async (
                    event: SyntheticEvent<Element, Event>, newValue: CodeSearchDomainModel | null
                ) => {
                    setState(prev => ({
                        ...prev,
                        productSubmitApplicationModel: {
                            ...prev.productSubmitApplicationModel,
                            skillStem: newValue?.codeName
                        }
                    }));
                },
                handleOpen: async () => {
                    if (stateRef.current.skillStemAC?.search?.length) {
                        return;
                    }
                    context.overlay
                        .open()
                        .execute(async () => {
                            try {
                                const response = await new CodeSearchViewApi().search({
                                    codeCd: Constants.CODE_SKILL_IMPACT_INDEX
                                });
                                setState(prev => ({
                                    ...prev,
                                    skillStemAC: response.data
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
            skillMotor: {
                onChange: async (
                    event: SyntheticEvent<Element, Event>, newValue: CodeSearchDomainModel | null
                ) => {
                    setState(prev => ({
                        ...prev,
                        productSubmitApplicationModel: {
                            ...prev.productSubmitApplicationModel,
                            skillMotor: newValue?.codeName
                        }
                    }));
                },
                handleOpen: async () => {
                    if (stateRef.current.skillMotorAC?.search?.length) {
                        return;
                    }
                    context.overlay
                        .open()
                        .execute(async () => {
                            try {
                                const response = await new CodeSearchViewApi().search({
                                    codeCd: Constants.CODE_SKILL_IMPACT_INDEX
                                });
                                setState(prev => ({
                                    ...prev,
                                    skillMotorAC: response.data
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
            skillSocial: {
                onChange: async (
                    event: SyntheticEvent<Element, Event>, newValue: CodeSearchDomainModel | null
                ) => {
                    setState(prev => ({
                        ...prev,
                        productSubmitApplicationModel: {
                            ...prev.productSubmitApplicationModel,
                            skillSocial: newValue?.codeName
                        }
                    }));
                },
                handleOpen: async () => {
                    if (stateRef.current.skillSocialAC?.search?.length) {
                        return;
                    }
                    context.overlay
                        .open()
                        .execute(async () => {
                            try {
                                const response = await new CodeSearchViewApi().search({
                                    codeCd: Constants.CODE_SKILL_IMPACT_INDEX
                                });
                                setState(prev => ({
                                    ...prev,
                                    skillSocialAC: response.data
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
            category: {
                onChange: async (
                    event: SyntheticEvent<Element, Event>, newValue: ProductSubmitApplicationModel | null
                ) => {
                    setState(prev => ({
                        ...prev,
                        productSubmitApplicationModel: {
                            ...prev.productSubmitApplicationModel,
                            categoryId: newValue?.categoryId
                        }
                    }));
                },
                handleOpen: async () => {
                    if (stateRef.current.categoryAC?.search?.length) {
                        return;
                    }
                    context.overlay
                        .open()
                        .execute(async () => {
                            try {
                                const response = await new CategorySearchViewApi().search({});
                                setState(prev => ({
                                    ...prev,
                                    categoryAC: response.data
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