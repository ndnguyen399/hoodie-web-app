/**
 * @author duynguyen © 2025
 */
import type { ChatbotMessagesApplicationModel, ChatbotMessagesDomainModel, SearchResponse } from "../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  chatbotMessagesApplicationModel: ChatbotMessagesApplicationModel;
  chatbotMessagesDomainModel: SearchResponse<ChatbotMessagesDomainModel>;
  isTyping: boolean;
  loading: boolean;
}