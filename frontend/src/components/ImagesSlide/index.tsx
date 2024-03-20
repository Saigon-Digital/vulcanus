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
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        spaceBetween={35}
        // navigation={}

        modules={[Autoplay, Navigation]}
        autoplay={{
          disableOnInteraction: false,
          delay: 0,
          stopOnLastSlide: false,
        }}
        // className={`${
        //     loading ? "opacity-0" : "opacity-100"
        // }`}
        slidesPerView={3}
        loop={true}
        // freeMode={true}
        speed={10000}>
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
                    //   sizes="100vw, (min-width: 640px) 33vw, (min-width: 1024px) 25vw, (min-width: 1280px) 20vw"
                    alt={"image slide"}
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
