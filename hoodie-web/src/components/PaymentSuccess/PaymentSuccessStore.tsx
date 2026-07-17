/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useApplicationContext } from "../../hooks/useApplicationContext";
import { useTranslation } from "../../hooks/useTranslation";
import type { PageProps, PageState } from "./PaymentSuccess.types";
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

    const [state, setState] = useState<PageState>({
        loading: false,
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                setState(prev => ({ ...prev, loading: true }));

                setState(prev => ({
                    ...prev,
                    
                    loading: false,
                }));
            });
        },
        
    }), []);

    return {
        t,
        state,
        action
    };
};