
import { Panel } from '@fluentui/react';
import type { PageProps } from './Introduction.type';
import { useStore } from './IntroductionStore';
import { IntroductionContent } from './IntroductionContent';

export const IntroductionPanel: React.FC<PageProps> = props => {
  const { t, action } = useStore(props);

  return (
    <>
      <Panel
        isOpen
        headerText={t('title-introduction')}
        // onDismiss={() => action.back.execute()}
        styles={{ main: { width: 1200 } }}
      >
        <IntroductionContent {...props} isPanel />
      </Panel>
    </>
  );
}