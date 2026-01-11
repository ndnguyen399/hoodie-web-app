
import type { PageProps } from './Introduction.type';
import { Container } from '@mui/material';
import { IntroductionContent } from './IntroductionContent';

export const Introduction: React.FC<PageProps> = props => {
  return (
    <Container maxWidth={false}>
      <IntroductionContent {...props} />
    </Container>
  );
};