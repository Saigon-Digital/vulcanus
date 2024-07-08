import {AcfLink} from "@/__generated__/graphql"
import dynamic from "next/dynamic"
import {twMerge} from "tailwind-merge"
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react"
import Button from "@/components/Button"
import {getAcfLinkProps} from "@/utils"
import {languages} from "@/utils/language"
import {useLocaleContext} from "@/context/LocaleContext"
import {log} from "console"

const MinusIcon = dynamic(
  () => import("../../Icons").then((mod) => mod.MinusIcon),
  {loading: () => <>loading</>}
)
const PlusIcon = dynamic(
  () => import("../../Icons").then((mod) => mod.PlusIcon),
  {loading: () => <>loading</>}
)
// const  {MinusIcon, PlusIcon}
// { __typename?: 'CareersBlockCareers', careerDescription?: string | null, location?: string | null, title?: string | null, cta?: { __typename?: 'AcfLink', title?: string | null, url?: string | null, target?: string | null } | null }
type Props = {
  itemKey: string
  expanded?: boolean
  className?: string
  item:
    | {
        __typename?: "CareersBlockCareers"
        careerDescription?: string | null
        location?: string | null
        title?: string | null
        cta?: AcfLink | null | undefined
      }
    | null
    | undefined
  onValueChange: (expanded: boolean, key: string) => void
}

const AccordionItem = (props: Props) => {
  const {itemKey, item, expanded, onValueChange} = props
  const contentRef = useRef<HTMLDivElement>(null)

  const {locale} = useLocaleContext()
  const triggerButtonProps = {
    "aria-expanded": expanded,
    "aria-controls": `section_${itemKey}`,
    onClick: () => onValueChange(!expanded, itemKey),
  } satisfies React.HTMLAttributes<HTMLButtonElement>

  const height = useMemo(() => {
    const calcHeight = (h?: number) => {
      const memo = []
      if (contentRef.current) {
        let height = Number(
          h ||
            contentRef?.current?.scrollHeight ||
            contentRef?.current?.getBoundingClientRect()?.height ||
            300
        )
        memo.push(height)
        memo.forEach((e) => {
          if (height > e) height = e
        })

        return height
      }
    }
    return calcHeight()
  }, [])

  return (
    <div className="career rounded-[10px] border border-primary-blue-main bg-[#051028]">
      <div className="flex flex-col items-center justify-between lg:flex-row lg:flex-wrap">
        <button
          {...triggerButtonProps}
          className={twMerge(
            "flex w-full  items-start justify-start px-5 pt-[28px]  transition-all duration-500 sm:px-4  md:px-[43px] lg:justify-between lg:px-[48px]",

            !expanded && "lg:pb-[28px]",
            expanded && "pb-[22px]"
          )}>
          <div className="-tracking-0.04 flex max-w-[450px] flex-col text-left text-2xl font-bold capitalize leading-[38px]  text-primary-blue-main lg:max-w-none">
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
            height: expanded ? height : 0,
          }}
          className="grid  w-full overflow-hidden transition-[height] duration-500 lg:order-3">
          <hr className="mx-auto w-[calc(100%-88px)] border-t border-primary-blue-main" />
          <div
            className={twMerge(
              "text-chocolate flex w-full flex-col items-start p-[20px]   pt-8  transition-all duration-300 lg:items-start lg:px-[48px] lg:pb-[40px]",

              !expanded && "collapse opacity-0",
              expanded && "visible opacity-100"
            )}>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: item?.careerDescription || "",
                }}
                className="description font-supreme-trial w-full text-left   font-light lg:text-left  [&>ul]:ml-4 [&>ul]:list-disc"></div>
            </div>
            {item?.cta && (
              <Button
                className="mx-auto mt-10 sm:mr-auto md:mt-8"
                href={item?.cta?.url || ""}>
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
  )
}

const TriggerLabel = ({expanded, className}: Props) => {
  return (
    <div
      className={`font-supreme-trial flex items-center gap-x-[10px] lg:gap-x-[20px] ${className}`}>
      {" "}
      {/*  gap-x-2.5 lg:gap-x-5 */}
      <div className="min-12-max-14 font-supreme-trial tracking-0.25 text-chocolate-lite relative font-medium uppercase">
        <span
          className={twMerge(
            "transition-opacity duration-300",
            expanded ? "opacity-0" : ""
          )}></span>
      </div>
      <div className="relative flex aspect-square w-[11px] items-center justify-center lg:w-[13px]">
        <div
          className={twMerge(
            "bg-chocolate-lite absolute h-[1px] w-full transition-all duration-300",

            expanded && "hidden "
          )}>
          <PlusIcon />
        </div>
        <div
          className={twMerge(
            "bg-chocolate-lite absolute h-[1px]  w-full transition-all duration-300",
            !expanded && "hidden"
          )}>
          <MinusIcon />
        </div>
      </div>
    </div>
  )
}

export default AccordionItem
