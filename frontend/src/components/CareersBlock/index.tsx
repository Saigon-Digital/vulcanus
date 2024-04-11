import React from "react";
import {CareerBlockFragment} from "@/__generated__/graphql";
import Accordion from "./Accordion";

const CareersBlock: React.FC<CareerBlockFragment> = (props) => {
  return !props.careers || !(props.careers?.length > 0) ? (
    <div
      className="careers container-fluid flex
  flex-col items-center gap-4 py-16 text-center text-2xl lg:py-20 xl:py-28">
      {props.noJobVacancy && (
        <div
          className="no-job mx-auto flex max-w-[1550px] flex-col"
          dangerouslySetInnerHTML={{__html: props.noJobVacancy}}></div>
      )}
    </div>
  ) : (
    <div
      className="container-fluid flex
     flex-col items-center gap-4 py-16 text-center lg:py-20 xl:py-28">
      {props.title && <h3 className="heading-2">{props.title}</h3>}
      {props.description && (
        <p className="max-w-[900px] font-light lg:text-xl">
          {props.description}
        </p>
      )}
      <div className="grid-col-12 mt-10 grid">
        <div className="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
          {props.careers && props.careers.length > 0 && (
            <Accordion careers={props.careers} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CareersBlock;
