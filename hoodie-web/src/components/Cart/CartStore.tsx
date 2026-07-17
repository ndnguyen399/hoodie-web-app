/**
 * @author duynguyen © 2025
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import type { PageProps, PageState } from "./Cart.types";
import { useTranslation } from "../../hooks/useTranslation";
import { useApplicationContext } from "../../hooks/useApplicationContext";
import type { CartSearchDomainModel } from "../common/Models";
import { CartSearchViewApi } from "../api/CartSearchViewApi";
import { CartSubmitViewApi } from "../api/CartSubmitViewApi";
import Constants from "../common/Constants";

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
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();

    const [state, setState] = useState<PageState>({
        cartSearchDomainModel: {},
        cartSearchApplicationModel: {},
        selectedItems: [],
        totalAmount: 0,
        selectedAmount: 0,
        selectAll: false,
        note: '',
        loading: false
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // Tính tổng tiền
    const calculateTotals = useCallback((cartItems: CartSearchDomainModel[], selectedIds: (string | number)[]) => {
        const totalAmount = cartItems.reduce((sum, item) => sum + item.price! * item.quantity!, 0);

        const selectedAmount = cartItems
            .filter(item => selectedIds.includes(item.productId!))
            .reduce((sum, item) => sum + item.price! * item.quantity!, 0);

        return { totalAmount, selectedAmount };
    }, []);

    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                setState(prev => ({ ...prev, loading: true}));

                const response = await new CartSearchViewApi().search(stateRef.current.cartSearchApplicationModel!);

                const { totalAmount, selectedAmount } = calculateTotals(response?.data?.search, []);

                setState(prev => ({
                    ...prev,
                    cartSearchDomainModel: response?.data || {},
                    // selectedItems: response?.data?.search?.map((item: any) => item.productId), // Mặc định chọn tất cả
                    // selectAll: true,
                    totalAmount,
                    selectedAmount,
                    loading: false,
                }));
            });
        },
        setSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => {
            const { selectedAmount } = calculateTotals([], stateRef.current?.selectedItems);
            setState(prev => ({
                ...prev,
                selectAll: e.target.checked,
                selectedAmount: selectedAmount
            }));
        },
        removeItem: async (model: CartSearchDomainModel) => {
            const isOk = 
                await context.navigation
                    .openConfirmDialog(`${t('label-textButtonDelete')} - ${t('label-productName')}: ${model.productName}`);
            if (!isOk) {
                return;
            }

            try {
                const result = await new CartSubmitViewApi().submitDelete({
                    requestType: Constants.REUEST_TYPE_DELETE,
                    model: {
                        cartItemId: model.cartItemId
                    }
                });
                const resultModel = result.data;
                let message = '';
                for (const item of resultModel) {
                    message += `${item.code}: ${item.message}\n`;
                }
                await context.navigation.openInformationDialog(message);
                await action.load()
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
        },
        toggleSelect: (productId: string | number) => {
            setState(prev => {
                const isSelected = prev.selectedItems.includes(productId);
                const newSelected = isSelected
                    ? prev.selectedItems.filter(id => id !== productId)
                    : [...prev.selectedItems, productId];

                const { selectedAmount } = calculateTotals(prev.cartSearchDomainModel.search!, newSelected);

                return {
                    ...prev,
                    selectedItems: newSelected,
                    selectedAmount,
                };
            });
        },
        toggleSelectAll: (checked: boolean) => {
            setState((prev: any) => {
                const newSelected = checked
                    ? prev.cartSearchDomainModel?.search?.map((item: any) => item.productId)
                    : [];

                const { selectedAmount } = calculateTotals(prev.cartSearchDomainModel?.search!, newSelected!);

                return {
                    ...prev,
                    selectedItems: newSelected,
                    selectedAmount,
                };
            });
        },
        submitUpdateCart: {
            execute: (productId: number, quantity: number) => {
                context.overlay
                .open()
                .execute(async () => {
                    setState(prev => ({ ...prev, isSubmitting: true }));
                    try {
                        const result = await new CartSubmitViewApi().submit({
                            requestType: Constants.REUEST_TYPE_UPDATE,
                            model: {
                                productId: productId,
                                quantity: quantity
                            }
                        });
                        const resultModel = result.data;
                        let message = '';
                        for (const item of resultModel) {
                            message += `${item.code}: ${item.message}\n`;
                        }
                        await context.navigation.openInformationDialog(message);
                        await action.load()
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
        submitCheckout: {
            excute: () => {
                const selectedItems = stateRef.current.selectedItems;
                const searchParams = new URLSearchParams({
                    totalAmount: String(stateRef.current.selectedAmount),
                    selectedItems: encodeURIComponent(JSON.stringify(selectedItems)),
                    note: stateRef.current.note
                });

                return navigate({
                    pathname: Constants.routeCheckOut,
                    search: searchParams.toString()
                });
            }
        },
        onChangeField: (item: string, newValue: any) => {
            setState(prev => ({
                ...prev,
                [item]: newValue
            }));
        },
    }), []);

    return {
        t,
        state,
        action
    };
};