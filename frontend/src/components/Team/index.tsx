import React from "react";
import {TeamBlock} from "@/__generated__/graphql";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import Image from "next/image";

const Team: React.FC<TeamBlock> = ({title, teamMembers}) => {
  //   console.log(props);

  return (
    <div className="container-fluid py-14 lg:py-20">
      <h3 className="mb-8 text-5xl font-semibold lg:mb-10 lg:text-[64px]">
        {title}
      </h3>
      <Swiper
        slidesPerView={4}
        spaceBetween={40}
        breakpoints={{
          220: {
            slidesPerView: 1,
            spaceBetween: 20,
          },

          480: {
            slidesPerView: 2,
            spaceBetween: 30,
          },

          840: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        loop={true}
        modules={[Autoplay]}>
        {teamMembers?.map((ele, index) => {
          return (
            <SwiperSlide key={index} className="">
              <div className="relative mb-4  aspect-[450/540] w-full lg:min-h-[450px]">
                <Image
                  fill
                  alt="team member"
                  className="object-cover"
                  src={ele?.image?.node?.sourceUrl || ""}
                />
              </div>
              <h4 className="text-xl font-bold text-primary-midBlue-main">
                {ele?.name}
              </h4>
              <p className="text-base">{ele?.role}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Team;
