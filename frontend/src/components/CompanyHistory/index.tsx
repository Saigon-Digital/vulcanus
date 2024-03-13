import React, {useMemo, useState} from "react";
import {CompanyHistoryBlock} from "@/__generated__/graphql";
import Image from "next/image";
import {Swiper, SwiperSlide, SwiperClass} from "swiper/react";

import {Pagination} from "swiper/modules";
import clsx from "clsx";

// import "./index.scss";
const CompanyHistory = (props: CompanyHistoryBlock) => {
  const activeSlide = props.histories
    ? Math.floor(props.histories?.length / 2) - 1
    : 0;

  const [currentSlide, setCurentSlide] = useState<number>(activeSlide);
  // console.log();

  const onSwiperChange = (swiper: SwiperClass) => {
    console.log("swiper change ", swiper.activeIndex);
    const slide = swiper.activeIndex;
    setCurentSlide(slide);
  };

  const activeHistory = useMemo(() => {
    return (
      props.histories && props.histories.find((ele, id) => id === currentSlide)
    );
  }, [currentSlide]);
  console.log(currentSlide);

  console.log(activeHistory);

  return (
    <div
      className={`history container-fluid rounded-xl bg-primary-midBlue-main px-5 py-14 lg:px-12 lg:py-20`}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-full flex flex-col md:col-span-4 lg:col-span-3">
          <h2 className="text-4xl font-bold lg:text-5xl xl:text-[64px]">
            {props.title}
          </h2>
          <div className="relative mt-10 flex w-[134px] gap-4  after:absolute after:top-1/2 after:h-14 after:w-full after:-translate-y-1/2 after:rounded-md after:bg-primary-blue-main md:flex-col md:justify-end lg:ml-auto ">
            <div className=" w-full">
              <Swiper
                modules={[Pagination]}
                grabCursor={true}
                direction="vertical"
                initialSlide={activeSlide}
                centeredSlides={true}
                onSlideChange={(swiper) => onSwiperChange(swiper)}
                slidesPerView={5}>
                {props.histories?.map((ele, id) => {
                  return (
                    <SwiperSlide
                      className={clsx(
                        ` !flex items-center justify-center  text-right `,
                        activeSlide === id && "slide-active",
                        id === currentSlide - 2 && "opacity-40",
                        id === currentSlide - 1 && "opacity-80",
                        id === currentSlide + 1 && "opacity-80",
                        id === currentSlide + 2 && "opacity-40"
                      )}
                      key={id}>
                      {ele?.year}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="col-span-full grid grid-cols-12 gap-4 md:col-span-8 md:gap-5">
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
          <div className="col-span-9 ">
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
