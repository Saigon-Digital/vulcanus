import {CareerBlockFragment, AcfLink} from "@/__generated__/graphql";
import dynamic from "next/dynamic";
import clsx from "clsx";
import {useLayoutEffect, useRef, useState} from "react";
import Button from "@/components/Button";
import {getAcfLinkProps} from "@/utils";
import {languages} from "@/utils/language";
import {useLocaleContext} from "@/context/LocaleContext";

const MinusIcon = dynamic(
  () => import("../../Icons").then((mod) => mod.MinusIcon),
  {loading: () => <>loading</>}
);
const PlusIcon = dynamic(
  () => import("../../Icons").then((mod) => mod.PlusIcon),
  {loading: () => <>loading</>}
);
// const  {MinusIcon, PlusIcon}
// { __typename?: 'CareersBlockCareers', careerDescription?: string | null, location?: string | null, title?: string | null, cta?: { __typename?: 'AcfLink', title?: string | null, url?: string | null, target?: string | null } | null }
type Props = {
  itemKey: string;
  expanded?: boolean;
  className?: string;
  item:
    | {
        __typename?: "CareersBlockCareers";
        careerDescription?: string | null;
        location?: string | null;
        title?: string | null;
        cta?: AcfLink | null | undefined;
      }
    | null
    | undefined;
  onValueChange: (expanded: boolean, key: string) => void;
};

const AccordionItem = (props: Props) => {
  const {itemKey, item, expanded, onValueChange} = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");
  const {locale} = useLocaleContext();
  const triggerButtonProps = {
    "aria-expanded": expanded,
    "aria-controls": `section_${itemKey}`,
    onClick: () => onValueChange(!expanded, itemKey),
  } satisfies React.HTMLAttributes<HTMLButtonElement>;

  return (
    <div className="career rounded-[10px] border border-primary-blue-main bg-[#051028]">
      <div className="flex flex-col items-center justify-between lg:flex-row lg:flex-wrap">
        <button
          {...triggerButtonProps}
          className={clsx(
            "flex w-full items-start justify-between px-4 pt-[28px] transition-all duration-500 md:px-[43px] lg:justify-between lg:px-[48px]",
            {
              "lg:pb-[28px]": !expanded,
              "pb-[22px]": expanded,
            }
          )}>
          <div className="-tracking-0.04 flex flex-col text-left text-2xl font-bold capitalize  leading-[38px] text-primary-blue-main">
            {item?.title}
            <span className="text-xl font-normal text-white">
              {languages(locale)?.location}: {item?.location}
            </span>
          </div>
          <div className="hidden justify-center  lg:block">
            <TriggerLabel {...props} />
          </div>
        </button>
        {/* Accordion Content */}
        <div
          ref={contentRef}
          id={`section_${itemKey}`}
          role="region"
          style={{
            height: expanded ? contentRef?.current?.scrollHeight : 0,
          }}
          className="grid overflow-hidden transition-[height] duration-500 lg:order-3 lg:w-full">
          <hr className="mx-auto w-[calc(100%-88px)] border-t border-primary-blue-main" />
          <div
            className={clsx(
              "text-chocolate flex w-full flex-col items-center p-[20px]  pt-8  transition-all duration-300 lg:items-start lg:px-[48px] lg:pb-[40px]",
              {
                "collapse opacity-0": !expanded,
                "visible opacity-100": expanded,
              }
            )}>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: item?.careerDescription || "",
                }}
                className="description font-supreme-trial w-full text-left   font-light lg:text-left  [&>ul]:ml-4 [&>ul]:list-disc"></div>
            </div>
            {item?.cta && (
              <Button className="mt-6" href={item?.cta?.url || ""}>
                {item.cta?.title}
              </Button>
            )}
          </div>
        </div>
        {/* Accordion Trigger */}
        <button
          className="mb-16 flex w-full justify-center lg:hidden"
          {...triggerButtonProps}>
          <TriggerLabel {...props} className="mt-3 -translate-x-6" />
        </button>
      </div>
    </div>
  );
};

const TriggerLabel = ({expanded, className}: Props) => {
  return (
    <div
      className={`font-supreme-trial flex items-center gap-x-[10px] lg:gap-x-[20px] ${className}`}>
      {" "}
      {/*  gap-x-2.5 lg:gap-x-5 */}
      <div className="min-12-max-14 font-supreme-trial tracking-0.25 text-chocolate-lite relative font-medium uppercase">
        <span
          className={clsx(
            "transition-opacity duration-300",
            expanded ? "opacity-0" : ""
          )}></span>
      </div>
      <div className="relative flex aspect-square w-[11px] items-center justify-center lg:w-[13px]">
        <div
          className={clsx(
            "bg-chocolate-lite absolute h-[1px] w-full transition-all duration-300",
            {
              "hidden ": expanded,
            }
          )}>
          <PlusIcon />
        </div>
        <div
          className={clsx(
            "bg-chocolate-lite absolute h-[1px]  w-full transition-all duration-300",
            {
              hidden: !expanded,
            }
          )}>
          <MinusIcon />
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
