import {ChecklistBlock as TCheckListBlock} from "@/__generated__/graphql";
import Button from "../Button";
import {getAcfLinkProps} from "@/utils";
import dynamic from "next/dynamic";
import LazyImport from "../LazyImport";
const CheckIcon = dynamic(() =>
  import("../Icons").then((mod) => mod.CheckIcon)
);

const ChecklistBlock: React.FC<TCheckListBlock> = (props) => {
  return (
    <div className="container-fluid py-20 xl:py-28">
      {props.preHeader && (
        <p className="mb-4 text-xl  font-semibold text-primary-blue-main xl:text-2xl xl:leading-[33px]">
          {props.preHeader}
        </p>
      )}
      <div className="flex flex-wrap gap-y-10">
        <div className="flex w-full flex-col gap-10 lg:w-1/2">
          {props.header && (
            <h2 className="max-w-[776px] gap-6 text-4xl font-bold xl:text-5xl xl:leading-[67px]">
              {props.header}
            </h2>
          )}
          {props.ctaGroup && (
            <Button
              className="w-[fit-content]"
              {...getAcfLinkProps(props.ctaGroup.link)}>
              {props.ctaGroup?.ctaText}
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
                  <div className="w-10 flex-[40px]">
                    <LazyImport>
                      <CheckIcon className="aspect-square h-6 w-6 flex-[1_60px]" />
                    </LazyImport>
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
