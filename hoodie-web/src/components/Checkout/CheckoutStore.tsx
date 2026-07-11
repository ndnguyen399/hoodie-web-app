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
        selectedItems: JSON.parse(decodeURIComponent(params.get('selectedItems') || '[]')),
        totalAmount: Number(params.get("totalAmount")) ?? 0,
        shippingAmount: 30000,
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
                    setState(prev => ({
                        ...prev,
                        checkoutInitialDomainModel: {
                            info: response.data?.info,
                            search: response.data?.search // Gán mảng vào thuộc tính 'search'
                        }
                        // checkoutInitialDomainModel: response.data?
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
        
    }), []);

    return {
        t,
        state,
        action
    };
};