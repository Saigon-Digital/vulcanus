import React, {useMemo, useState} from "react";
import {CompanyHistoryBlock} from "@/__generated__/graphql";
import Image from "next/image";
import {Swiper, SwiperSlide, SwiperClass, useSwiper} from "swiper/react";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {Pagination} from "swiper/modules";
import clsx from "clsx";

// import "./index.scss";
const CompanyHistory = (props: CompanyHistoryBlock) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const activeSlide = isMobile
    ? props.histories
      ? Math.floor(props.histories?.length / 2) - 1
      : 0
    : 0;

  const [currentSlide, setCurentSlide] = useState<number | undefined>(
    activeSlide
  );
  // console.log();
  // const swiper = useSwiper();

  const onSwiperChange = (swiper: SwiperClass) => {
    // console.log("swiper change ", swiper.activeIndex);
    const slide = swiper.activeIndex;
    if (isMobile)
      //@ts-ignore
      return setCurentSlide((prev: number) => {
        if (slide - 1 < 0) return 0;
        return slide - 1;
      });
    setCurentSlide(slide);
  };

  const activeHistory = useMemo(() => {
    return (
      props.histories && props.histories.find((ele, id) => id === currentSlide)
    );
  }, [currentSlide]);

  return (
    <div
      className={`history container-fluid rounded-xl bg-primary-midBlue-main px-5 py-14 lg:px-12 lg:py-20`}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-full grid grid-cols-6 md:col-span-4 md:mt-0 lg:col-span-3">
          <h2 className="col-span-full text-4xl font-bold lg:text-5xl xl:text-[64px]">
            {props.title}
          </h2>

          <div className="relative col-span-2  mt-10  flex h-[360px] w-[65px] gap-4 after:absolute after:top-0 after:h-14 after:w-full after:rounded-md after:bg-primary-blue-main md:col-span-full md:w-[134px] md:flex-col md:justify-end after:md:top-1/2 after:md:-translate-y-1/2 lg:ml-auto ">
            <div className=" w-full">
              <Swiper
                modules={[Pagination]}
                grabCursor={true}
                direction="vertical"
                initialSlide={activeSlide}
                centeredSlides={isMobile ? false : true}
                onSlideChange={(swiper) => onSwiperChange(swiper)}
                slidesPerView={5}>
                {props.histories?.map((ele, id) => {
                  return (
                    <SwiperSlide
                      onClick={(e) => {
                        setCurentSlide(id);
                        // swiper.slideTo(id);
                      }}
                      className={clsx(
                        ` !flex items-center justify-center text-right text-xl  xl:text-3xl `,
                        activeSlide === id && "slide-active",
                        currentSlide &&
                          id === currentSlide - 2 &&
                          "opacity-40 xl:text-[24px]",
                        currentSlide && id === currentSlide - 1 && "opacity-80",
                        currentSlide &&
                          id === currentSlide + 2 &&
                          "opacity-40 xl:text-[24px]",
                        currentSlide && id === currentSlide + 1 && "opacity-80 "
                      )}
                      key={id}>
                      {ele?.year}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <div className="col-span-4 mt-10 md:hidden">
            <Image
              className="aspect-video w-full rounded-md object-cover"
              alt="history"
              width={920}
              height={540}
              src={
                activeHistory?.mainImage?.node.sourceUrl ||
                "/images/hero-banner.png"
              }
            />
            <div className="mt-5">{activeHistory?.description}</div>
          </div>
        </div>
        <div className="col-span-full hidden grid-cols-12 gap-4 md:col-span-8 md:grid md:gap-5 lg:col-start-5">
          <div className="col-span-3">
            <Image
              className="ml-auto aspect-[316/267] rounded-md object-cover lg:w-3/4"
              alt="history"
              width={360}
              height={267}
              src={
                activeHistory?.supportingImage?.node?.sourceUrl ||
                "/images/photo-1.png"
              }
            />
          </div>
          <div className="col-span-9 max-w-[903px]">
            <Image
              className="aspect-video w-full rounded-md object-cover"
              alt="history"
              width={920}
              height={540}
              src={
                activeHistory?.mainImage?.node.sourceUrl ||
                "/images/hero-banner.png"
              }
            />
            <div className="mt-5">{activeHistory?.description}</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        background: red;
      `}</style>
    </div>
  );
};

export default CompanyHistory;
