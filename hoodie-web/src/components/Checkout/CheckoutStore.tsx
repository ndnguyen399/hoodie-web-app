/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState } from "react";
import type { PageProps, PageState } from "./Checkout.types";
import { useTranslation } from "../../hooks/useTranslation";
import { useApplicationContext } from "../../hooks/useApplicationContext";
import { useAppParameters } from "../../hooks/useAppParameters";
import { useNavigate } from "react-router-dom";
import Constants from "../common/Constants";
import { CheckoutSubmitViewApi } from "../api/CheckoutSubmitViewApi";
import { PaymentSubmitViewApi } from "../api/PaymentSubmitViewApi";
import type { CheckoutSubmitApplicationModel } from "../common/Models";
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
    const params = useAppParameters();
    const navigate = useNavigate();

    const [state, setState] = useState<PageState>({
        checkoutInitialDomainModel: {},
        checkoutSubmitApplicationModel: {},
        userAddressesDomainModel: {},
        selectedItems: JSON.parse(decodeURIComponent(params.get('selectedItems') || '[]')),
        totalAmount: Number(params.get("totalAmount")) ?? 0,
        shippingAmount: 30000,
        isSubmitting: false,
        loading: false
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                try {
                    const response = await new CheckoutSubmitViewApi().initial({
                        requestType: Constants.REUEST_TYPE_INITIAL,
                        model: {
                            listId: stateRef.current.selectedItems
                        }
                    });
                    const responseOfUserAddress = await new UserAddressSubmitViewApi().initial({
                        requestType: Constants.REUEST_TYPE_DETAIL,
                        model: {}
                    });
                    setState(prev => ({
                        ...prev,
                        checkoutInitialDomainModel: {
                            info: response.data?.info,
                            search: response.data?.search // Gán mảng vào thuộc tính 'search'
                        },
                        checkoutSubmitApplicationModel: {
                            note: params.get('note') || '',
                        },
                        userAddressesDomainModel: responseOfUserAddress.data.search[0] || []
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
            const before: CheckoutSubmitApplicationModel = stateRef.current.checkoutSubmitApplicationModel!;
            const checkoutSubmitApplicationModel: CheckoutSubmitApplicationModel = {
                ...before,
                [item]: newValue
            };
            setState(prev => ({
                ...prev,
                checkoutSubmitApplicationModel
            }));
        },
        submitPayment: {
            execute: () => {
                context.overlay
                .open()
                .execute(async () => {
                    setState(prev => ({ ...prev, isSubmitting: true }));
                    try {
                        const result = await new PaymentSubmitViewApi().submit({
                            requestType: Constants.REUEST_TYPE_CREATE,
                            model: {
                                listId: stateRef.current.selectedItems,
                                note: stateRef.current.checkoutSubmitApplicationModel?.note,
                                paymentMethod: stateRef.current.checkoutSubmitApplicationModel?.paymentMethod
                            }
                        });
                        const resultModel = result.data;
                        let message = '';
                        for (const item of resultModel) {
                            message += `${item.code}: ${item.message}\n`;
                        }
                        await context.navigation.openInformationDialog(message);
                        window.open(resultModel[0].paymentUrl, '_blank', 'noopener,noreferrer');
                        // if (resultModel.paymentStatus === "unpaid") {
                            // window.location.href = response.paymentUrl;
                            // navigate({
                            //     pathname: resultModel.paymentUrl
                            // });
                        // }
                        // await action.load()
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
        back: {
            execute: () => {
                navigate("/cart")
            }
        },
    }), []);

    return {
        t,
        state,
        action
    };
};