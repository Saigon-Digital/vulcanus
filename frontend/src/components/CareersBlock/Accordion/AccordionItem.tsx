import {CareerBlockFragment} from "@/__generated__/graphql";
import clsx from "clsx";
import {useRef} from "react";
import Button from "@/components/Button";

type Props = {
  itemKey: string;
  expanded?: boolean;
  item: {
    __typename?: "CareersBlockCareers";
    careerDescription?: string | null;
    location?: string | null;
    title?: string | null;
    cta?: {
      __typename?: "CareersBlockCareersCta";
      ctaText?: string | null;
      ctaLink?: {
        __typename?: "AcfLink";
        url?: string | null;
        target?: string | null;
      } | null;
    } | null;
  } | null;

  onValueChange: (expanded: boolean, key: string) => void;
};

const TriggerLabel = ({expanded}: Props) => {
  return (
    <div className="font-supreme-trial flex items-center gap-x-[10px] lg:gap-x-[20px]">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none">
            <g clip-path="url(#clip0_618_893)">
              <path
                d="M20 0C8.95437 0 0 8.95437 0 20C0 31.0462 8.95437 40 20 40C31.0462 40 40 31.0462 40 20C40 8.95437 31.0462 0 20 0ZM20 37.5394C10.3506 37.5394 2.5 29.6494 2.5 19.9999C2.5 10.3505 10.3506 2.49992 20 2.49992C29.6494 2.49992 37.5 10.3506 37.5 19.9999C37.5 29.6493 29.6494 37.5394 20 37.5394ZM28.75 18.75H21.25V11.25C21.25 10.56 20.69 10 20 10C19.31 10 18.75 10.56 18.75 11.25V18.75H11.25C10.56 18.75 10 19.31 10 20C10 20.69 10.56 21.25 11.25 21.25H18.75V28.75C18.75 29.44 19.31 30 20 30C20.69 30 21.25 29.44 21.25 28.75V21.25H28.75C29.44 21.25 30 20.69 30 20C30 19.31 29.44 18.75 28.75 18.75Z"
                fill="#009EE0"
              />
            </g>
            <defs>
              <clipPath id="clip0_618_893">
                <rect width="40" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div
          className={clsx(
            "bg-chocolate-lite absolute h-[1px]  w-full transition-all duration-300",
            {
              hidden: !expanded,
            }
          )}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none">
            <g clip-path="url(#clip0_618_886)">
              <path
                d="M20 0C31.0547 0 40 8.94531 40 20C40 31.0547 31.0547 40 20 40C8.94531 40 0 31.0547 0 20C0 8.94531 8.94531 0 20 0ZM20 37.5391C29.6484 37.5391 37.5 29.6484 37.5 20C37.5 10.3516 29.6484 2.5 20 2.5C10.3516 2.5 2.5 10.3516 2.5 20C2.5 29.6484 10.3516 37.5391 20 37.5391ZM18.6328 21.25H11.25C10.5469 21.25 10 20.7031 10 20C10 19.2969 10.5469 18.75 11.25 18.75H28.75C29.4531 18.75 30 19.2969 30 20C30 20.7031 29.4531 21.25 28.75 21.25H18.6328Z"
                fill="#009EE0"
              />
            </g>
            <defs>
              <clipPath id="clip0_618_886">
                <rect width="40" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

const AccordionItem = (props: Props) => {
  const {itemKey, item, expanded, onValueChange} = props;
  const contentRef = useRef<HTMLDivElement>(null);

  const triggerButtonProps = {
    "aria-expanded": expanded,
    "aria-controls": `section_${itemKey}`,
    onClick: () => onValueChange(!expanded, itemKey),
  } satisfies React.HTMLAttributes<HTMLButtonElement>;

  return (
    <div className="career rounded-[10px] border border-primary-blue-main bg-[#051028]">
      <div className="flex flex-col items-center lg:flex-row lg:flex-wrap">
        <button
          {...triggerButtonProps}
          className={clsx(
            "flex w-full items-start justify-between px-[43px] pt-[28px] transition-all duration-500 lg:justify-between lg:px-[48px]",
            {
              "lg:pb-[28px]": !expanded,
              "pb-[22px]": expanded,
            }
          )}>
          <div className="-tracking-0.04 flex flex-col text-left text-2xl font-bold capitalize  leading-[38px] text-primary-blue-main">
            {item?.title}
            <span className="text-xl font-normal text-white">
              location: {item?.location}
            </span>
          </div>
          <div className="hidden lg:block">
            <TriggerLabel {...props} />
          </div>
        </button>
        {/* Accordion Content */}
        <div
          ref={contentRef}
          id={`section_${itemKey}`}
          role="region"
          style={{
            height: expanded ? contentRef?.current?.scrollHeight + "px" : 0,
          }}
          className="grid overflow-hidden transition-[height] duration-500 lg:order-3 lg:w-full">
          <hr className="mx-auto w-[calc(100%-88px)] border-t border-primary-blue-main" />
          <div
            className={clsx(
              "text-chocolate flex flex-col items-center p-[20px]  pt-8  transition-all duration-300 lg:items-start lg:px-[48px] lg:pb-[40px]",
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
                className="min-18-max-26 description font-supreme-trial text-center  font-light lg:max-w-[79.3%] lg:text-left [&>ul]:ml-4 [&>ul]:list-disc"></div>
            </div>
            {item?.cta && (
              <Button
                className="mt-6"
                href={(item.cta?.ctaLink?.url as string) || "#"}
                target={item.cta.ctaLink?.target || "_blank"}>
                {item.cta?.ctaText}
              </Button>
            )}
          </div>
        </div>
        {/* Accordion Trigger */}
        <button className="mb-[14px] lg:hidden" {...triggerButtonProps}>
          <TriggerLabel {...props} />
        </button>
      </div>
    </div>
  );
};

export default AccordionItem;
