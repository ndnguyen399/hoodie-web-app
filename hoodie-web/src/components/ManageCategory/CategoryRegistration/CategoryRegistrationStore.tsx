/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState, type SyntheticEvent } from "react";
import { useApplicationContext } from "../../../hooks/useApplicationContext";
// import { useAppParameters } from "../../hooks/useAppParameters";
import { useTranslation } from "../../../hooks/useTranslation";
import type { PageProps, PageState } from "./CategoryRegistration.types";
import { CodeSearchViewApi } from "../../api/CodeSearchViewApi";
import Constants from "../../common/Constants";
import type { CategorySubmitApplicationModel, CodeSearchDomainModel } from "../../common/Models";
// import type { ICommandBarItemProps } from "@fluentui/react";
import { useNavigate } from "react-router-dom";

/**
 * useStore
 * 
 * @param props 
 * @returns useStore
 */
export const useStore = (props: PageProps) => {
    const { t } = useTranslation();
    const context = useApplicationContext();
    // const params = useAppParameters();
    const navigate = useNavigate();

    const [state, setState] = useState<PageState>({
        categorySubmitApplicationModel: {},
        skillTypeAC: {},
        ageGroupAC: {},
        loading: false,
        isSubmitting: false
        // ribbonItem: []
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                setState(prev => ({
                    ...prev,
                    // ribbonItem: action.getRibbonItem()
                }));
            });
        },
        onChangeField: (item: string, newValue: any) => {
            const before: CategorySubmitApplicationModel = stateRef.current.categorySubmitApplicationModel!;
            const categorySubmitApplicationModel: CategorySubmitApplicationModel = {
                ...before,
                [item]: newValue
            };
            setState(prev => ({
                ...prev,
                categorySubmitApplicationModel
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
        submitCategory: {
            execute: (event: React.FormEvent<HTMLFormElement>) => {
                context.overlay
                .open()
                .execute(async () => {
                    event.preventDefault();
                    setState(prev => ({ ...prev, isSubmitting: true }));
                    try {
                        // const result = await new AuthViewApi().registration(
                        //     stateRef.current.registerRequestApplicationModel!
                        // );
                        // const resultModel = result.data;
                        // let message = '';
                        // for (const item of resultModel) {
                        //     message += `${item.code}: ${item.message}\n`;
                        // }
                        // await context.navigation.openInformationDialog(message);
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
            skillType: {
                onChange: async (
                    event: SyntheticEvent<Element, Event>, newValue: CodeSearchDomainModel | null
                ) => {
                    setState(prev => ({
                        ...prev,
                        categorySubmitApplicationModel: {
                            skillType: newValue?.codeName!
                        }
                    }));
                },
                handleOpen: async () => {
                    context.overlay
                        .open()
                        .execute(async () => {
                            try {
                                const response = await new CodeSearchViewApi().search({
                                    codeCd: Constants.CODE_SKILL_TYPE
                                });
                                setState(prev => ({
                                    ...prev,
                                    skillTypeAC: response.data
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
            ageGroup: {
                onChange: async (
                    event: SyntheticEvent<Element, Event>, newValue: CodeSearchDomainModel | null
                ) => {
                    setState(prev => ({
                        ...prev,
                        categorySubmitApplicationModel: {
                            ageGroup: newValue?.codeName!
                        }
                    }));
                },
                handleOpen: async () => {
                    context.overlay
                        .open()
                        .execute(async () => {
                            try {
                                const response = await new CodeSearchViewApi().search({
                                    codeCd: Constants.CODE_AGE_GROUP
                                });
                                setState(prev => ({
                                    ...prev,
                                    ageGroupAC: response.data
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