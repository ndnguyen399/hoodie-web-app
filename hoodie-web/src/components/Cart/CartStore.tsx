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
                    // selectedItems: response?.data.map((item: any) => item.productId), // Mặc định chọn tất cả
                    totalAmount,
                    selectedAmount,
                    loading: false,
                }));
            });
        },
        // updateQuantity: async (productId: string | number, quantity: number) => {
        //     if (quantity < 1) return;

        //     setState(prev => {
        //         const updatedItems = prev.cartItems.map(item =>
        //             item.productId === productId ? { ...item, quantity } : item
        //         );

        //         const { totalAmount, selectedAmount } = calculateTotals(
        //             updatedItems,
        //             prev.selectedItems
        //         );

        //         return {
        //             ...prev,
        //             cartItems: updatedItems,
        //             totalAmount,
        //             selectedAmount,
        //         };
        //     });

        //     // TODO: Gọi API cập nhật quantity
        // },

        // removeItem: async (productId: string | number) => {
        //     setState(prev => {
        //         const updatedItems = prev.cartItems.filter(item => item.productId !== productId);
        //         const updatedSelected = prev.selectedItems.filter(id => id !== productId);

        //         const { totalAmount, selectedAmount } = calculateTotals(updatedItems, updatedSelected);

        //         return {
        //             ...prev,
        //             cartItems: updatedItems,
        //             selectedItems: updatedSelected,
        //             totalAmount,
        //             selectedAmount,
        //         };
        //     });

        //     // TODO: Gọi API xóa item
        // },

        // toggleSelect: (productId: string | number) => {
        //     setState(prev => {
        //         const isSelected = prev.selectedItems.includes(productId);
        //         const newSelected = isSelected
        //             ? prev.selectedItems.filter(id => id !== productId)
        //             : [...prev.selectedItems, productId];

        //         const { selectedAmount } = calculateTotals(prev.cartItems, newSelected);

        //         return {
        //             ...prev,
        //             selectedItems: newSelected,
        //             selectedAmount,
        //         };
        //     });
        // },

        // toggleSelectAll: (checked: boolean) => {
        //     setState(prev => {
        //         const newSelected = checked
        //             ? prev.cartSearchDomainModel?.search?.map(item => item.productId)
        //             : [];

        //         const { selectedAmount } = calculateTotals(prev.cartSearchDomainModel?.search!, newSelected);

        //         return {
        //             ...prev,
        //             selectedItems: newSelected,
        //             selectedAmount,
        //         };
        //     });
        // },

        // clearCart: async () => {
        //     setState(prev => ({
        //         ...prev,
        //         cartItems: [],
        //         selectedItems: [],
        //         totalAmount: 0,
        //         selectedAmount: 0,
        //     }));
        //     // TODO: Gọi API clear cart
        // },

        // checkout: () => {
        //     if (stateRef.current.selectedItems.length === 0) {
        //         alert("Vui lòng chọn ít nhất một sản phẩm");
        //         return;
        //     }
        //     // Chuyển sang trang thanh toán
        //     // navigate('/checkout', { state: { selectedItems: stateRef.current.selectedItems } });
        //     console.log("Proceeding to checkout with items:", stateRef.current.selectedItems);
        // },

        // Thêm vào giỏ (nếu dùng từ trang khác)
        // addToCart: async (newItem: Omit<CartItem, 'cartItemId'>) => {
        //     // Logic thêm item vào giỏ
        //     console.log("Add to cart:", newItem);
        // },
    }), []);

    return {
        t,
        state,
        action
    };
};