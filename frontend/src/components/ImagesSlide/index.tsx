import {ImagesSLideFragment} from "@/__generated__/graphql";
import React, {useEffect, useMemo, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, A11y} from "swiper/modules";
import Image from "next/image";
import "swiper/css/autoplay";
import {useRatio} from "@/hooks/useRatio";
import ImageWithRatio from "../ImageWithRatio";
const ImagesSlide = (props: ImagesSLideFragment) => {
  const slides = props?.slides?.map((slide: any) => {
    let ratio = useRatio(slide);
    return {...slide, ratio: ratio};
  });
  console.log("slides 123", slides);

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
        grabCursor
        modules={[Autoplay, Navigation, A11y]}
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
          [...props.slides, ...props.slides].map((ele, index) => {
            // const src = ele && urlForImage(ele)?.url();
            // if (!ele.dimention.w || !ele.dimention.h) return null;

            return (
              <SwiperSlide key={index} className="h-[480px]">
                {/* <div className="relative aspect-video w-full"> */}
                <ImageWithRatio
                  imageSrc={ele?.image?.node.sourceUrl || ""}
                  height={480}
                />
                {/* </div> */}
              </SwiperSlide>
            );
          })}
      </Swiper>

      <div className="logo-swiper-pagination mt-16 text-center lg:mt-24"></div>
    </div>
  );
};

export default ImagesSlide;
