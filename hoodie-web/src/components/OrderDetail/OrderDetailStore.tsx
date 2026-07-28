/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useApplicationContext } from "../../hooks/useApplicationContext";
import { useTranslation } from "../../hooks/useTranslation";
import type { PageProps, PageState } from "./OrderDetail.types";
import Constants from "../common/Constants";
import { useNavigate } from "react-router-dom";
import { OrderSearchViewApi } from "../api/OrderSearchViewApi";
import { useAppParameters } from "../../hooks/useAppParameters";

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
    const params = useAppParameters();

    const [state, setState] = useState<PageState>({
        orderSearchDomainModel: {},
        loading: false,
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);


    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                try {
                    const responseOfOrder = await new OrderSearchViewApi().search({
                        orderId: Number(params.get("orderId"))!
                    });
                    setState(prev => ({
                        ...prev,
                        orderSearchDomainModel: responseOfOrder.data.search[0] || {}
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
        goBack: () => {
            window.history.back();
        },
    }), []);

    return {
        t,
        state,
        action
    };
};