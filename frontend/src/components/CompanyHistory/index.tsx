import React, {useMemo, useState} from "react";
import {CompanyHistoryBlock} from "@/__generated__/graphql";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
// import "./index.scss";
const CompanyHistory = (props: CompanyHistoryBlock) => {
  const [activeYear, setActiveYear] = useState(2018);

  const getActive = (year: number) => {
    return props.histories?.find((ele) => ele?.year === year);
  };
  return (
    <div
      className={`history container-fluid rounded-xl bg-primary-midBlue-main px-5 py-14 lg:px-12 lg:py-20`}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-full flex flex-col md:col-span-4 lg:col-span-3">
          <h2 className="text-4xl font-bold lg:text-5xl xl:text-[64px]">
            {props.title}
          </h2>
          <div className="flex gap-4 md:flex-col md:justify-end">
            <div className=" w-full">
              <Swiper
                modules={[Pagination]}
                grabCursor={true}
                // direction="vertical"
                centeredSlides={true}
                slidesPerView={5}>
                {props.histories?.map((ele, id) => {
                  return (
                    <SwiperSlide className=" inline-block text-right" key={id}>
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
              className="ml-auto aspect-[316/267] rounded-md lg:w-3/4"
              alt="history"
              width={360}
              height={267}
              src={getActive(activeYear - 1)?.mainImage?.node.sourceUrl || ""}
            />
          </div>
          <div className="col-span-9 ">
            <Image
              className="aspect-video w-full rounded-md"
              alt="history"
              width={920}
              height={540}
              src={getActive(activeYear)?.mainImage?.node.sourceUrl || ""}
            />
            <p className="mt-5">{getActive(activeYear)?.description}</p>
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
