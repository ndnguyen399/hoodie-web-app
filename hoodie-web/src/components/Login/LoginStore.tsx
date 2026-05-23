/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useApplicationContext } from "../../hooks/useApplicationContext";
import { useTranslation } from "../../hooks/useTranslation";
import type { PageProps, PageState } from "./Login.types";
import type { LoginRequestApplicationModel } from "../common/Models";
import { AuthViewApi } from "../api/AuthViewApi";
import { useAuth } from "../../hooks/AuthProvider";
import Constants from "../common/Constants";
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
    const navigate = useNavigate();
    const auth = useAuth();

    const [state, setState] = useState<PageState>({
        loginRequestApplicationModel: {},
        loading: false
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                setState(prev => ({
                    ...prev
                }));
            });
        },
        onChangeField: (item: string, newValue: any) => {
            const before: LoginRequestApplicationModel = stateRef.current.loginRequestApplicationModel!;
            const loginRequestApplicationModel: LoginRequestApplicationModel = {
                ...before,
                [item]: newValue
            };
            setState(prev => ({
                ...prev,
                loginRequestApplicationModel
            }));
        },
        cleanData: {
            execute: () => {
                setState(prev => ({
                    ...prev,
                    loginRequestApplicationModel: {}
                }));
            }
        },
        submitLogin: {
            execute: () => {
                context.overlay
                .open()
                .execute(async () => {
                    setState(prev => ({ ...prev, loading: true }));
                    try {
                        const result = await new AuthViewApi().login(
                            stateRef.current.loginRequestApplicationModel!
                        );
                        const resultModel = result.data;
                        const accessToken = resultModel.accessToken;
                        const refreshToken = resultModel.refreshToken;

                        const role = auth.login(accessToken, refreshToken);
                        if (resultModel) {
                            await context.navigation.openInformationDialog(t("label-loginSuccess"));
                        }
                        if (role === Constants.ROLE_ADMIN) {
                            navigate(Constants.routeDashboard);
                        } else if (role === Constants.ROLE_CUSTOMER) {
                            navigate(Constants.routeHomePage);
                        }
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
                            loading: false
                        }));
                    }
                });
            }
        },
    }), []);

    return {
        t,
        state,
        action
    };
};