/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState } from "react";
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
        loading: false
        // ribbonItem: []
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                action.searchProduct.execute();
                action.searchCategory.execute();
                setState(prev => ({
                    ...prev,
                    // ribbonItem: action.getRibbonItem()
                }));
            });
        },
        searchCategory: {
            execute: async () => {
                context.overlay
                    .open()
                    .execute(async () => {
                        setState(prev => ({ ...prev, loading: true }));

                        const response = await new CategorySearchViewApi().search({});

                        setState(prev => ({
                            ...prev,
                            categorySearchDomainModel: response?.data,
                            loading: false
                        }));
                    });
            }
        },
        searchProduct: {
            execute: async () => {
                context.overlay
                    .open()
                    .execute(async () => {
                        setState(prev => ({ ...prev }));

                        const response = await new ProductSearchViewApi().search({
                            productId: stateRef.current.productSearchApplicationModel?.productId,
                            categoryId: stateRef.current.productSearchApplicationModel?.categoryId,
                            productName: stateRef.current.productSearchApplicationModel?.productName,
                            minPrice: stateRef.current.productSearchApplicationModel?.minPrice,
                            maxPrice: stateRef.current.productSearchApplicationModel?.maxPrice
                        });

                        setState(prev => ({
                            ...prev,
                            productSearchDomainModel: response?.data
                        }));
                    });
            }
        },
        items: {
            // category: {
            //     onChange: async (
            //         event: React.ChangeEvent<HTMLInputElement>
            //     ) => {
            //         const target = (event.target as HTMLInputElement).value;
            //         const newValue = Number(target);

            //         if (isNaN(newValue)) {
            //             return;
            //         }
            //         setState(prev => ({
            //             ...prev,
            //             productSearchApplicationModel: {
            //                 categoryId: newValue
            //             }
            //         }));
            //         action.searchProduct.execute();
            //     }
            // }
        }
    }), []);

    return {
        t,
        state,
        action
    };
};