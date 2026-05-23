/**
 * @author duynguyen © 2025
 */
import React from 'react';
import type { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from '../Image'; // Giả sử Image là component tùy chỉnh của bạn
import { Box } from '@mui/material';

type slideType = {
    alt: string;
    src: string;
}

type PropType = {
    slides: Array<slideType>;
    options?: EmblaOptionsType;
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

    return (
        <Box
            sx={{
                // maxWidth: '48rem',
                // margin: 'auto',
                // '--slide-height': '19rem',
                // '--slide-spacing': '1rem',
                // '--slide-size': '100%',
            }}
        >
            <Box
                ref={emblaRef}
                sx={{
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        touchAction: 'pan-y pinch-zoom',
                        // marginLeft: 'calc(var(--slide-spacing) * -1)',
                    }}
                >
                    {slides.map((slide, i) => (
                        <Box
                            key={i}
                            sx={{
                                transform: 'translate3d(0, 0, 0)',
                                flex: '0 0 var(--slide-size)',
                                minWidth: 0,
                                // paddingLeft: 'var(--slide-spacing)',
                            }}
                        >
                            <Box
                                sx={{
                                    // boxShadow: 'inset 0 0 0 0.2rem var(--detail-medium-contrast)', // Giữ nguyên nếu bạn có biến CSS này
                                    borderRadius: '1.8rem',
                                    // fontSize: '4rem',
                                    // fontWeight: 1000,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100vh',
                                    userSelect: 'none',
                                }}
                            >
                                <Image
                                    src={slide.src}
                                    alt={`image-carousel-${i}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        cursor: 'pointer',
                                    }}
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default EmblaCarousel;