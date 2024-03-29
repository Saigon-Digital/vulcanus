import {ImagesSLideFragment} from "@/__generated__/graphql";
import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules";
import Image from "next/image";
import "swiper/css/autoplay";
const ImagesSlide = (props: ImagesSLideFragment) => {
  return (
    <div className={`image-slide mx-auto w-full max-w-sm sm:max-w-none`}>
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
          1920: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
        }}
        spaceBetween={35}
        // navigation={}
        freeMode
        modules={[Autoplay, Navigation]}
        autoplay={{
          disableOnInteraction: false,
          delay: 500,
          stopOnLastSlide: false,
        }}
        slidesPerView={"auto"}
        loop={true}
        // freeMode={true}
        speed={6000}>
        {props.slides &&
          [...props?.slides, ...props?.slides].map((ele, index) => {
            // const src = ele && urlForImage(ele)?.url();

            return (
              <SwiperSlide key={index}>
                <div className="relative aspect-video w-full">
                  <img
                    src={ele?.image?.node.sourceUrl || ""}
                    //   fill

                    loading="eager"
                    alt={" slide"}
                    className="aspect-auto min-h-[480px] object-contain"
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>

      <div className="logo-swiper-pagination mt-16 text-center lg:mt-24"></div>
    </div>
  );
};

export default ImagesSlide;
