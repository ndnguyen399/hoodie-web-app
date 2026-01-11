
import { Box } from '@mui/material';
// import { CommandBar } from '@fluentui/react';
// import type { EmblaOptionsType } from 'embla-carousel'
import type { PageProps } from './Introduction.type';
// import EmblaCarousel from '../../templates/EmblaCarousel/EmblaCarousel';
import { useStore } from './IntroductionStore';
import { useEffect } from 'react';
// import Images from '../../utils/Images';
import SwiperSlider from '../../templates/SwiperSlider/SwiperSlider';

export const IntroductionContent: React.FC<PageProps> = props => {
  const { t, state, action } = useStore(props);

  // const OPTIONS: EmblaOptionsType = { loop: true }
  // const SLIDE_COUNT = 2
  // const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  useEffect(() => {
    action.load();
  }, []);

  return (
    <>
      {/* <CommandBar items={state.ribbonItem} /> */}
      <Box>
          {/* <EmblaCarousel slides={Images.slides} options={OPTIONS} /> */}
          <SwiperSlider />
      </Box>
    </>
  );
};