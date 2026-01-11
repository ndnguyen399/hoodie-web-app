
import { useCallback } from 'react';
import ContentText from '../assets/content-text.json';

const dictionary: Record<string, string> = {
  // 'title-tradeTermsCustomerTypeEntry': 'Trade Terms Customer Type Entry',
  // 'label-patternCd': 'Pattern Code',
  // 'label-patternName': 'Pattern Name',
  // 'label-sortKey': 'Sort Key',
  // 'message-confirm': 'Do you want to register?',
  // 'message-back-confirm': 'Do you want to go back?',
  ...(ContentText as Record<string, string>),
};

export const useTranslation = () => {
  const t = useCallback((key: string) => {
    return dictionary[key] ?? key;
  }, []);

  return { t };
};
