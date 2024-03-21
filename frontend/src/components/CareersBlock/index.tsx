import React from "react";
import {CareerBlockFragment} from "@/__generated__/graphql";
import Accordion from "./Accordion";
const CareersBlock: React.FC<CareerBlockFragment> = (props) => {

  return (
  // Check null
    <div className="container-fluid flex
     flex-col items-center gap-4 py-16 text-center lg:py-20 xl:py-28">
      <h2 className="heading-2">{props.title}</h2>
      <p className="max-w-[900px] lg:text-xl">{props.description}</p>
      <div className="grid-col-12 mt-10 grid">
        <div className="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
          {props.careers && <Accordion careers={props.careers} />}
        </div>
      </div>
    </div>
  );
};

export default CareersBlock;
