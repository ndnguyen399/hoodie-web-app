
import { useEffect, useMemo, useRef, useState } from 'react';
import { useApplicationContext } from '../../hooks/useApplicationContext';
import { useAppParameters } from '../../hooks/useAppParameters';
import { useTranslation } from '../../hooks/useTranslation';
import type { PageProps, PageState } from './Introduction.type';

// ==============================|| INTRODUCTION STORE ||============================== //

export const useStore = (props: PageProps) => {
  const { t } = useTranslation();
  const context = useApplicationContext();
  const params = useAppParameters();

  const [state, setState] = useState<PageState>({
    ribbonItem: []
  });

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const action = useMemo(() => ({
    load: async () => {
      await context.overlay.open().execute(async () => {
        setState(prev => ({
          ...prev,
          // tradeTermsCustomerTypeEntryServiceModel: {
          //   model: {
          //     customerTypeInfoName: 'Demo Name',
          //     sortKey: 1
          //   }
          // },
          // ribbonItem: action.getRibbonItem()
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
  