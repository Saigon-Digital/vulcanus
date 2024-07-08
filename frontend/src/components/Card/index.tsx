import {getAcfLinkProps, getUrlPathname} from "@/utils"
import Link from "next/link"
import ArrowRight from "public/icons/arrow-right.svg"
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import {CardShape} from "../Icons"
import {CardsBlockCards_Fields} from "@/__generated__/graphql"
import Image from "next/image"
import {StaticImport} from "next/dist/shared/lib/get-img-props"

import {languages} from "@/utils/language"

import {useLocaleContext} from "@/context/LocaleContext"
import {useMediaQuery} from "@/hooks/useMediaQuery"
import {twMerge} from "tailwind-merge"
type Props = {
  setCardHeight?: (h: number) => void
  maxHeight?: number
  hoverImage?: string | StaticImport | undefined
} & CardsBlockCards_Fields &
  React.HTMLAttributes<HTMLDivElement>

const Card: React.FC<Props> = ({
  setCardHeight,
  title,
  maxHeight,
  description = "",
  className,
  hasImage,
  iconImage,
  backgroundColor,
  hoverImage,
  link,
  ...props
}) => {
  const {locale} = useLocaleContext()
  const [height, setHeight] = useState<number | "auto">("auto")
  const textRef = useRef<HTMLParagraphElement | null>(null)
  const textSize = description ? description.length : 200

  console.log(maxHeight)

  return (
    <div
      style={{background: backgroundColor || undefined}}
      className={twMerge(
        " group relative z-10 flex h-full min-h-[400px] flex-col gap-3  overflow-hidden  rounded-[5px] border border-primary-blue-main p-4 transition-all duration-300 lg:min-h-[400px] xl:min-h-[450px] ",
        !hoverImage ? "justify-end hover:bg-primary-midBlue-main" : "",
        iconImage ? "justify-start" : "justify-between",
        link && "cursor-pointer",
        className
      )}
      {...props}>
      {link ? (
        <Link
          href={link.url || ""}
          aria-label={title}
          className={`absolute inset-0 z-[20] h-full w-full items-center gap-x-4 text-primary-blue-main transition-all duration-300
          ${!backgroundColor && "group-hover:text-secondary-offWhite-white"}
          `}></Link>
      ) : null}
      {hoverImage && (
        <>
          <Image
            fill
            quality={70}
            loading="lazy"
            sizes="(max-width: 768px) 80vw,(max-width: 1080px) 30vw,(max-width: 1280px) 15vw"
            alt="hover image"
            className="hover-image z-0 object-cover opacity-0 transition-all duration-300 group-hover:opacity-80"
            src={hoverImage}
          />
          <div className="z-5 absolute left-0 top-0 h-full w-full bg-black/40"></div>
        </>
      )}
      <CardShape
        className={twMerge(
          `absolute -top-2 right-0 w-8 translate-x-10 opacity-0 transition-all   duration-500 md:top-0 md:w-12`,
          !backgroundColor &&
            "group-hover:translate-x-[5px] group-hover:opacity-100  md:group-hover:translate-x-2"
        )}
      />
      <h3
        className={`relative z-10 text-lg font-semibold leading-[140%] tracking-tight text-primary-blue-main
          transition-all duration-300 2xl:text-2xl ${
            !backgroundColor && "group-hover:text-secondary-offWhite-white"
          }`}>
        {title}
      </h3>
      {hasImage && (
        <Image
          src={iconImage?.node.sourceUrl || ""}
          width={150}
          height={150}
          className="mx-auto my-14 h-1/3 object-contain xl:h-1/4"
          alt="icon image"
        />
      )}

      <div
        ref={textRef}
        className={twMerge(
          "relative z-10 flex  flex-col  gap-3",
          !link ? "mb-6  h-auto justify-between" : ` h-[68%] justify-between`
        )}>
        {description && (
          <p
            ref={textRef}
            style={{color: backgroundColor ? "#140F24" : undefined}}
            className=" mb-0 line-clamp-6 flex flex-col  justify-end pb-2  text-base font-light leading-[18px] text-secondary-offWhite-white  xl:leading-[25px] 2xl:text-lg [&>*]:text-base [&>*]:leading-[20px] 2xl:[&>*]:text-[17px] 2xl:[&>*]:leading-[22px]"
            dangerouslySetInnerHTML={{
              __html:
                description.length > 350
                  ? description.slice(0, 350) + "..."
                  : description,
            }}></p>
        )}
        {link ? (
          <Link
            href={link?.url || ""}
            className="group z-[100] inline-flex items-center gap-x-3 leading-[1.5] text-primary-blue-main transition-all duration-300 group-hover:text-secondary-offWhite-white">
            {languages(locale)?.readMore}
            <ArrowRight className="h-[22px] w-[22px] shrink-0 leading-[1.5] transition duration-500   [&_path]:text-primary-blue-main [&_path]:transition-all [&_path]:duration-300 group-hover:[&_path]:text-secondary-offWhite-white" />
          </Link>
        ) : null}
      </div>
    </div>
  )
}

export default Card
