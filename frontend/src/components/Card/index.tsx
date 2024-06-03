import {getAcfLinkProps, getUrlPathname} from "@/utils";
import Link from "next/link";
import ArrowRight from "public/icons/arrow-right.svg";
import React, {useEffect, useRef} from "react";

import CardShape from "./images/card-shape.svg";
import {CardsBlockCards_Fields} from "@/__generated__/graphql";
import Image from "next/image";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import clsx from "clsx";
import {languages} from "@/utils/language";

import {useLocaleContext} from "@/context/LocaleContext";
type Props = {
  hoverImage?: string | StaticImport | undefined;
} & CardsBlockCards_Fields &
  React.HTMLAttributes<HTMLDivElement>;

const Card: React.FC<Props> = ({
  title,
  description = "",
  className,
  hasImage,
  iconImage,
  backgroundColor,
  hoverImage,
  link,
  ...props
}) => {
  const {locale} = useLocaleContext();

  const textRef = useRef<HTMLParagraphElement | null>(null);

  return (
    <div
      style={{background: backgroundColor || undefined}}
      className={clsx(
        " group relative z-10 flex h-full min-h-[300px] flex-col gap-3  overflow-hidden  rounded-[5px] border border-primary-blue-main p-6 transition-all duration-300 xl:min-h-[450px] ",
        !hoverImage ? "justify-end hover:bg-primary-midBlue-main" : "",
        iconImage ? "justify-start" : "justify-between",
        link && "cursor-pointer",
        className
      )}
      {...props}>
      {link ? (
        <Link
          {...getAcfLinkProps(link)}
          aria-label={title}
          className={`absolute inset-0 z-[10] h-full w-full items-center gap-x-4 text-primary-blue-main transition-all duration-300
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
        alt="shape"
        className={clsx(
          `absolute right-0 top-0 translate-x-10  opacity-0 transition-all duration-500`,
          !backgroundColor &&
            "group-hover:translate-x-0  group-hover:opacity-100"
        )}
        width={48}
        height={133}
      />
      <h3
        className={`relative z-10 font-semibold leading-[140%] tracking-tight text-primary-blue-main transition-all
          duration-300 min-max-[20_24] ${
            !backgroundColor && "group-hover:text-secondary-offWhite-white"
          }`}>
        {title}
      </h3>
      {hasImage && (
        <Image
          src={iconImage?.node.sourceUrl || ""}
          width={150}
          height={150}
          className="mx-auto my-14 h-1/4 object-contain"
          alt="icon image"
        />
      )}
      <div
        className={clsx(
          "relative z-10 flex  flex-col  gap-5",
          !link ? "h-[48%] justify-start xl:h-[40%]" : "h-[48%] justify-end"
        )}>
        {description && (
          <p
            ref={textRef}
            style={{color: backgroundColor ? "#140F24" : undefined}}
            className="mb-0 line-clamp-6 text-base font-light leading-[25px] text-secondary-offWhite-white 2xl:text-lg"
            dangerouslySetInnerHTML={{__html: description}}></p>
        )}
        {link ? (
          <Link
            {...getAcfLinkProps(link)}
            className="inline-flex items-center gap-x-4 text-primary-blue-main transition-all duration-300 group-hover:text-secondary-offWhite-white">
            {languages(locale)?.readMore}
            <ArrowRight className="h-[22px] w-[22px] shrink-0 [&_path]:text-primary-blue-main [&_path]:transition-all [&_path]:duration-300 group-hover:[&_path]:text-secondary-offWhite-white" />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
