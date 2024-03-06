import {ChecklistBlock as TCheckListBlock} from "@/__generated__/graphql";
import React from "react";
import Button from "../Button";
import {CheckIcon} from "../Icons";

const ChecklistBlock: React.FC<TCheckListBlock> = (props) => {
  return (
    <div className="container-fluid py-20 xl:py-28">
      <p className="mb-4 text-xl text-primary-blue-main">{props.preHeader}</p>
      <div className="flex flex-wrap">
        <div className="flex w-full flex-col gap-10 lg:w-1/2">
          <h2 className="max-w-[776px] gap-6 text-4xl">{props.header}</h2>
          {props.cta && (
            <Button
              className="w-[fit-content]"
              href={(props.cta?.ctaLink as string) || "#"}>
              {props.cta?.ctaText}
            </Button>
          )}
        </div>
        <div className="flex w-full flex-col lg:w-1/2">
          {props.checklist &&
            props.checklist?.map((ele, id) => {
              return (
                <div
                  key={id}
                  className={`flex  gap-5 border-b border-white py-6 lg:py-10 ${
                    id === 0 ? "pt-0 lg:pt-0" : ""
                  }`}>
                  <CheckIcon className="aspect-square h-6 w-6 flex-[1_60px]" />
                  {ele?.item}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ChecklistBlock;
