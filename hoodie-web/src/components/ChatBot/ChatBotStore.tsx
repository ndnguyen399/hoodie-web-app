/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState } from "react";
import type { PageProps, PageState } from "./ChatBot.types";
import { useTranslation } from "../../hooks/useTranslation";
import { useApplicationContext } from "../../hooks/useApplicationContext";
import { useAppParameters } from "../../hooks/useAppParameters";
import { useNavigate } from "react-router-dom";
import type { ChatbotMessagesApplicationModel, ChatbotMessagesDomainModel } from "../common/Models";

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
        hasInitializedChat: false,
        isTyping: false,
        loading: false
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // ================== HELPER ==================
    // const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    let messageIdCounter = Date.now(); // dùng tạm để tạo id số

    const generateMessageId = (): number => {
        messageIdCounter += 1;
        return messageIdCounter;
    };

    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                action.addMessage(
                    "Xin chào! Tôi là trợ lý AI chuyên về đồ chơi STEM Toy. Bạn muốn hỏi gì về sản phẩm, lợi ích hoặc cách chọn đồ chơi phù hợp?",
                    true
                );
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
        addMessage: (content: string, isBot: boolean): number => {
            const newMessage: ChatbotMessagesDomainModel = {
                messageId: generateMessageId(),
                content,
                reserveItem01: isBot ? "01" : "02", // 01 = bot, 02 = user
                createdAt: new Date(),
                updatedAt: new Date()
            };
            setState(prev => ({
                ...prev,
                chatbotMessagesDomainModel: {
                    ...prev.chatbotMessagesDomainModel,
                    search: [...(prev.chatbotMessagesDomainModel?.search || []), newMessage]
                }
            }));
            return newMessage.messageId!;
        },
        updateBotMessage: (messageId: number, content: string) => {
            setState(prev => {
                const messages = prev.chatbotMessagesDomainModel?.search || [];
                const updated = messages.map(msg =>
                    msg.messageId === messageId
                        ? { ...msg, content, updatedAt: new Date() }
                        : msg
                );
                return {
                    ...prev,
                    chatbotMessagesDomainModel: {
                        ...prev.chatbotMessagesDomainModel,
                        search: updated
                    }
                };
            });
        },
        submitSentMessageChatbot: {
            execute: () => {
                context.overlay
                .open()
                .execute(async () => {
                    const question = stateRef.current.chatbotMessagesApplicationModel?.inputText?.trim();
                    if (!question) return;

                    // 1. Thêm tin nhắn của User
                    action.addMessage(question, false);

                    // 2. Xóa input + bật trạng thái đang gõ
                    setState(prev => ({
                        ...prev,
                        chatbotMessagesApplicationModel: {
                            ...prev.chatbotMessagesApplicationModel,
                            inputText: ""
                        },
                        isTyping: true
                    }));
                    // 3. Tạo message rỗng của Bot để stream vào
                    const botMessageId = action.addMessage("", true);
                    try {
                        const response = await fetch("http://localhost:8080/assistant/chat", {
                            method: "POST",
                            headers: {
                                "Content-Type": "text/plain",
                            },
                            body: question,
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const fullText = await response.text();
                        action.updateBotMessage(botMessageId, fullText.trim() || "Xin lỗi, tôi chưa nhận được phản hồi.");
                    } catch (error: any) {
                        console.error("Chatbot error:", error);
                        action.updateBotMessage(
                            botMessageId,
                            "Xin lỗi, hiện tại hệ thống đang gặp sự cố. Vui lòng thử lại sau."
                        );
                    } finally {
                        setState(prev => ({
                            ...prev,
                            isTyping: false
                        }));
                    }
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