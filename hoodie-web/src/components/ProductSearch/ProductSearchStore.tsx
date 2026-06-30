/**
 * @author duynguyen © 2025
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useApplicationContext } from "../../hooks/useApplicationContext";
// import { useAppParameters } from "../../hooks/useAppParameters";
import { useTranslation } from "../../hooks/useTranslation";
import type { PageProps, PageState } from "./ProductSearch.types";
// import type { ICommandBarItemProps } from "@fluentui/react";
// import { useNavigate } from "react-router-dom";
import { ProductSearchViewApi } from "../api/ProductSearchViewApi";
import { CategorySearchViewApi } from "../api/CategorySearchViewApi";

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
    // const navigate = useNavigate();

    const [state, setState] = useState<PageState>({
        productSearchApplicationModel: {},
        categorySearchApplicationModel: {},
        productSearchDomainModel: {},
        categorySearchDomainModel: {},
        loading: false,
        // Dữ liệu lọc local
        allProducts: [],
        filteredProducts: [],
        filters: {
            minPrice: 0,
            maxPrice: 5000000,
            selectedCategoryIds: [],
            searchText: "",
        },
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // Lọc sản phẩm trên client
    const applyLocalFilter = useCallback((products: any[], filters: any) => {
        return products.filter(item => {
            const matchPrice = 
                (!filters.minPrice || item.price >= filters.minPrice) &&
                (!filters.maxPrice || item.price <= filters.maxPrice);

            const matchCategory = 
                filters.selectedCategoryIds.length === 0 || 
                filters.selectedCategoryIds.includes(item.categoryId);

            const matchSearch = 
                !filters.searchText || 
                item.productName.toLowerCase().includes(filters.searchText.toLowerCase());

            return matchPrice && matchCategory && matchSearch;
        });
    }, []);

    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                setState(prev => ({ ...prev, loading: true }));

                // action.searchProduct.execute();
                const productResponse = await new ProductSearchViewApi().search({
                    productId: stateRef.current.productSearchApplicationModel?.productId,
                    categoryId: stateRef.current.productSearchApplicationModel?.categoryId,
                    productName: stateRef.current.productSearchApplicationModel?.productName,
                    minPrice: stateRef.current.productSearchApplicationModel?.minPrice,
                    maxPrice: stateRef.current.productSearchApplicationModel?.maxPrice
                });

                // action.searchCategory.execute();
                const categoryResponse = await new CategorySearchViewApi().search({});

                const allProducts = productResponse?.data?.search || [];

                setState(prev => ({
                    ...prev,
                    productSearchDomainModel: productResponse?.data || {},
                    categorySearchDomainModel: categoryResponse?.data || {},
                    allProducts,
                    filteredProducts: allProducts,
                    loading: false,
                }));
            });
        },
        // searchCategory: {
        //     execute: async () => {
        //         context.overlay
        //             .open()
        //             .execute(async () => {
        //                 setState(prev => ({ ...prev, loading: true }));

        //                 const response = await new CategorySearchViewApi().search({});

        //                 setState(prev => ({
        //                     ...prev,
        //                     categorySearchDomainModel: response?.data,
        //                     loading: false
        //                 }));
        //             });
        //     }
        // },
        // searchProduct: {
        //     execute: async () => {
        //         context.overlay
        //             .open()
        //             .execute(async () => {
        //                 setState(prev => ({ ...prev }));

        //                 const response = await new ProductSearchViewApi().search({
        //                     productId: stateRef.current.productSearchApplicationModel?.productId,
        //                     categoryId: stateRef.current.productSearchApplicationModel?.categoryId,
        //                     productName: stateRef.current.productSearchApplicationModel?.productName,
        //                     minPrice: stateRef.current.productSearchApplicationModel?.minPrice,
        //                     maxPrice: stateRef.current.productSearchApplicationModel?.maxPrice
        //                 });

        //                 setState(prev => ({
        //                     ...prev,
        //                     productSearchDomainModel: response?.data
        //                 }));
        //             });
        //     }
        // },
        // Cập nhật filter và lọc local
        updateFilters: (newFilters: Partial<typeof state.filters>) => {
            setState(prev => {
                const updatedFilters = { ...prev.filters, ...newFilters };
                const filtered = applyLocalFilter(prev.allProducts, updatedFilters);

                return {
                    ...prev,
                    filters: updatedFilters,
                    filteredProducts: filtered,
                };
            });
        },

        // Tìm kiếm theo text (local)
        searchText: (text: string) => {
            action.updateFilters({ searchText: text });
        },
    }), []);

    return {
        t,
        state,
        action
    };
};