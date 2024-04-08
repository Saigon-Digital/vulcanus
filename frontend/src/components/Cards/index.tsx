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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
        {props?.cards?.map((card, id) => {
          return (
            <Card
              key={id}
              hasImage={card?.hasImage}
              iconImage={card?.iconImage}
              backgroundColor={card?.backgroundColor}
              title={card?.title || ""}
              description={card?.description}
              link={card?.link}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
