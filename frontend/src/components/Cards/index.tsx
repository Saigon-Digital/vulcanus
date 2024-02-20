import {CardsBlock_Fields} from "@/__generated__/graphql";
import React from "react";
import Card from "../Card";
import {Swiper, SwiperSlide} from "swiper/react";
const Cards: React.FC<CardsBlock_Fields> = (props) => {
  return (
    <div className="container-fluid py-14">
      <h2 className="heading-2 mb-14">{props?.title}</h2>
      <Swiper
        className="!overflow-visible"
        spaceBetween={24}
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
            <SwiperSlide key={id}>
              <Card
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
