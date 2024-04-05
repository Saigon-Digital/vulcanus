import {ImagesSLideFragment} from "@/__generated__/graphql";
import React, {useEffect, useMemo, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, A11y} from "swiper/modules";
import Image from "next/image";
import "swiper/css/autoplay";
const ImagesSlide = (props: ImagesSLideFragment) => {
  const [slides, setSlides] = useState<any[]>();

  const getImageAspectRatio = function (
    imageSrc: string,
    callback: (w: number, h: number) => void
  ) {
    var img = document.createElement("img");
    img.onload = () => {
      var w = img.naturalWidth;
      var h = img.naturalHeight;
      callback(w, h);
    };
    img.src = imageSrc;
  };

  useEffect(() => {
    if (typeof document !== undefined) {
      let result: any = [];
      props.slides?.forEach((slide) => {
        let dimention: {w: number; h: number} = {w: 0, h: 0};
        getImageAspectRatio(slide?.image?.node.sourceUrl || "", (w, h) => {
          console.log(w, h);

          dimention.w = w;
          dimention.h = h;
        });
        result = [...result, {...slide, dimention}];
      });
      setSlides(result);
    }
  }, []);

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
        {slides &&
          [...slides, ...slides].map((ele, index) => {
            // const src = ele && urlForImage(ele)?.url();

            return (
              <SwiperSlide key={index}>
                <div className="relative aspect-video w-full">
                  <Image
                    src={ele?.image.node.sourceUrl || ""}
                    //   fill

                    width={ele.dimention.w}
                    height={ele.dimention.h}
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
