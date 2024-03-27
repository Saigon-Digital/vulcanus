import {CardsBlock_Fields} from "@/__generated__/graphql";
import React from "react";
import Card from "../Card";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const Cards: React.FC<CardsBlock_Fields> = (props) => {
  return (
    <div className="cards container-fluid py-14">
      <h2 className="heading-2 mb-14">{props?.title}</h2>
      <Swiper
        className="!overflow-visible"
        modules={[Pagination, Autoplay]}
        autoplay={{delay: 4000}}
        height={460}
        spaceBetween={24}
        pagination
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}>
        {props?.cards?.map((card, id) => {
          return (
            <SwiperSlide className="h-[400px] xl:h-[450px]  " key={id}>
              <Card
                hasImage={card?.hasImage}
                iconImage={card?.iconImage}
                backgroundColor={card?.backgroundColor}
                title={card?.title || ""}
                description={card?.description}
                link={card?.link}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Cards;
