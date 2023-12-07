import React from "react";
import {TCard} from "../Card";
import Card from "../Card";
type TProps = {
  cards: TCard[];
};

const Cards: React.FC<TProps> = ({cards}) => {
  return (
    <div className="container-fluid py-20">
      <h3 className="title-xl mb-14">Manufacturing</h3>
      <div className="grid grid-cols-3 gap-6">
        {cards.map((ele, id) => {
          return (
            <Card
              key={id}
              {...ele}
              className="min-h-[300px] lg:min-h-[400px]"
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
