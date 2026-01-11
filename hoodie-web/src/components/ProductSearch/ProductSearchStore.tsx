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
        // getRibbonItem: (): ICommandBarItemProps[] => [
        //     {
        //         key: 'home',
        //         text: t("label-home"),
        //         // iconProps: { iconName: "ArrowBackIos" },
        //         onClick: () => action.toHomePage.execute()
        //     },
        //     {
        //         key: 'back',
        //         text: t("label-back"),
        //         // iconProps: { iconName: 'ItalicIcon' },
        //         onClick: () => action.back.execute()
        //     }
        // ],
        // toHomePage: {
        //     execute: () => {
        //         navigate("/")
        //     }
        // },
        // back: {
        //     execute: () => {
        //         navigate(-1)
        //     }
        // },
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
                            keyword: stateRef.current.productSearchApplicationModel?.keyword!,
                            categoryId: stateRef.current.productSearchApplicationModel?.categoryId!,
                            colorId: stateRef.current.productSearchApplicationModel?.colorId!,
                            sizeId: stateRef.current.productSearchApplicationModel?.sizeId!,
                            minPrice: stateRef.current.productSearchApplicationModel?.minPrice!,
                            maxPrice: stateRef.current.productSearchApplicationModel?.maxPrice!
                        });

                        setState(prev => ({
                            ...prev,
                            productSearchDomainModel: response?.data
                        }));
                    });
            }
        },
        items: {
            category: {
                onChange: async (
                    event: React.ChangeEvent<HTMLInputElement>
                ) => {
                    const target = (event.target as HTMLInputElement).value;
                    const newValue = Number(target);

                    if (isNaN(newValue)) {
                        return;
                    }
                    setState(prev => ({
                        ...prev,
                        productSearchApplicationModel: {
                            categoryId: newValue
                        }
                    }));
                    action.searchProduct.execute();
                }
            },
            color: {
                onChange: async (
                    event: React.ChangeEvent<HTMLInputElement>
                ) => {
                    const target = (event.target as HTMLInputElement).value;
                    const newValue = Number(target);
                    console.log("newValue1", newValue);
                    
                    if (isNaN(newValue)) {
                        return;
                    }
                    
                    setState(prev => ({
                        ...prev,
                        productSearchApplicationModel: {
                            colorId: newValue
                        }
                    }));

                    console.log("newValue5", stateRef.current.productSearchApplicationModel?.categoryId);
                    console.log("newValue5", stateRef.current.productSearchApplicationModel?.colorId);
                    // action.searchProduct.execute({});
                }
            }
        }
    }), []);

    return {
        t,
        state,
        action
    };
};