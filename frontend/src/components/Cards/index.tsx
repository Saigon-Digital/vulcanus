import {CardsBlock_Fields} from "@/__generated__/graphql";
import Card from "../Card";
import "swiper/css";
import "swiper/css/pagination";
import {useConsoleLog} from "@/utils";
import {twMerge} from "tailwind-merge";
const Cards: React.FC<CardsBlock_Fields> = (props) => {
  return (
    <div className="cards container-fluid py-14">
      <h2 className="heading-2 mb-14">{props?.title}</h2>

      <div
        className={twMerge(
          "grid grid-cols-1 gap-4 md:grid-cols-3  ",
          props.cards?.length &&
            props.cards.length > 3 &&
            "md:grid-cols-2 xl:grid-cols-4"
        )}>
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
