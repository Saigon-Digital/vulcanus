import {ChecklistBlock as TCheckListBlock} from "@/__generated__/graphql";
import React from "react";
import Button from "../Button";
import {CheckIcon} from "../Icons";

const ChecklistBlock: React.FC<TCheckListBlock> = (props) => {
  return (
    <div className="container-fluid py-20 xl:py-28">
      <p className="mb-4 text-xl font-normal text-primary-blue-main xl:text-2xl">
        {props.preHeader}
      </p>
      <div className="flex flex-wrap gap-y-10">
        <div className="flex w-full flex-col gap-10 lg:w-1/2">
          <h2 className="max-w-[776px] gap-6 text-4xl font-bold xl:text-5xl xl:leading-[67px]">
            {props.header}
          </h2>
          {props.cta && (
            <Button
              className="w-[fit-content]"
              href={(props.cta?.ctaLink?.url as string) || "#"}>
              {props.cta?.ctaText}
            </Button>
          )}
        </div>
        <div className="flex w-full flex-col lg:w-1/2">
          {props.checklist &&
            props.checklist?.map((ele, id) => {
              const last = props.checklist ? props.checklist?.length - 1 : null;
              return (
                <div
                  key={id}
                  className={`flex  gap-5 border-b border-[#E6ECF3] py-6 lg:py-10 ${
                    id === 0 ? "border-t border-[#E6ECF3]" : ""
                  }
                  ${id === last && "border-b-transparent"}
                  `}>
                  <div className="min-w-[40px]">
                    <CheckIcon className="inline-block aspect-square h-10 w-10 flex-[40px] md:h-6 md:w-6" />
                  </div>
                  <p className="lg:text-lg">{ele?.item}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ChecklistBlock;
