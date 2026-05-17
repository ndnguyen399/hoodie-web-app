/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useApplicationContext } from "../../hooks/useApplicationContext";
import { useTranslation } from "../../hooks/useTranslation";
import type { PageProps, PageState } from "./Register.types";

/**
 * useStore
 * 
 * @param props 
 * @returns useStore
 */
export const useStore = (props: PageProps) => {
    const { t } = useTranslation();
    const context = useApplicationContext();

    const [state, setState] = useState<PageState>({
        // productSearchApplicationModel: {},
        // categorySearchApplicationModel: {},
        // productSearchDomainModel: {},
        // categorySearchDomainModel: {},
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
                // action.searchProduct.execute();
                // action.searchCategory.execute();
                setState(prev => ({
                    ...prev,
                    // ribbonItem: action.getRibbonItem()
                }));
            });
        },
        register: {
            execute: async () => {
                context.overlay
                .open()
                .execute(async () => {
                    setState(prev => ({ ...prev, loading: true }));

                    // const response = await new CategorySearchViewApi().search({});

                    setState(prev => ({
                        ...prev,
                        // categorySearchDomainModel: response?.data,
                        loading: false
                    }));
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