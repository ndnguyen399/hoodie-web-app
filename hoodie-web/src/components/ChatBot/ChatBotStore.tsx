/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState } from "react";
import type { PageProps, PageState } from "./ChatBot.types";
import { useTranslation } from "../../hooks/useTranslation";
import { useApplicationContext } from "../../hooks/useApplicationContext";
import { useAppParameters } from "../../hooks/useAppParameters";
import { useNavigate } from "react-router-dom";
import type { ChatbotMessagesApplicationModel } from "../common/Models";

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
        chatbotMessagesApplicationModel: {},
        chatbotMessagesDomainModel: {},
        isTyping: false,
        loading: false
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                
            });
        },
        onChangeField: (item: string, newValue: any) => {
            const before: ChatbotMessagesApplicationModel = stateRef.current.chatbotMessagesApplicationModel!;
            const chatbotMessagesApplicationModel: ChatbotMessagesApplicationModel = {
                ...before,
                [item]: newValue
            };
            setState(prev => ({
                ...prev,
                chatbotMessagesApplicationModel
            }));
        },
    }), []);

    return {
        t,
        state,
        action
    };
};