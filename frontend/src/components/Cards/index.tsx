import {CardsBlock_Fields} from "@/__generated__/graphql";
import React from "react";
import Card from "../Card";
const Cards: React.FC<CardsBlock_Fields> = (props) => {
  return (
    <div className="container-fluid">
      <h3 className="title-xl mb-14">{props?.title}</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {props?.cards?.map((card, id) => {
          return (
            <Card
              key={id}
              title={card?.title ?? ""}
              description={card?.description ?? ""}
            />
          );
        })}
      </div>
    </div>
  );
};

Cards.defaultProps = {
  cards: [
    {
      title: "CNC - Turning",
      description: `CNC turning is a highly precise machining process that revolves around the removal of material from a rotating workpiece using computer-controlled cutting tools.`,
    },
    {
      title: "CNC - Milling",
      description: `CNC milling is a versatile and efficient machining technique that employs computer-driven tools to subtract material from a workpiece, enabling the creation of intricate shapes, contours, and features
        Read more`,
    },
    {
      title: "Welding",
      description: `Welding is the essential art of bonding materials, primarily metals, by applying heat and pressure to meld them together. This crucial joining process finds extensive use in construction, manufacturing.
        Read more`,
    },
  ],
};

export default Cards;
