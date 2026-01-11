
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/effect-fade';;

import Images from '../../utils/Images';

const SwiperSlider: React.FC = () => {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Navigation, Pagination]}
      effect="fade"                  
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation={true}              
      pagination={{ clickable: true }}
      speed={800}
      spaceBetween={0}
      slidesPerView={1}
      style={{ width: '100%', height: '100vh' }}
    >
      {Images.slides.map((slide: any, index: number) => (
        <SwiperSlide key={index}>
          <div
            style={{
              backgroundImage: `url(${slide.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: 'white',
              textAlign: 'center',
            }}
          >
            {/* Nếu slide có title/description, thêm ở đây */}
            {/* <h1 style={{ fontSize: '4rem' }}>{slide.title || `Slide ${index + 1}`}</h1>
            <p style={{ fontSize: '1.5rem' }}>{slide.description || 'Nội dung overlay'}</p> */}
            {/* Ví dụ button */}
            {/* <button style={{ padding: '1rem 2rem', marginTop: '2rem' }}>Call to Action</button> */}
          </div>
        </SwiperSlide>
      ))}

      {Images.slides.length === 0 && (
        <SwiperSlide>
          <div style={{ backgroundColor: '#ccc', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>No slides available</p>
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default SwiperSlider;