import {getAcfLinkProps, getUrlPathname} from "@/utils";
import Link from "next/link";
import ArrowRight from "public/icons/arrow-right.svg";
import React from "react";
import {twMerge} from "tailwind-merge";
import CardShape from "./images/card-shape.svg";
import {CardsBlockCards_Fields} from "@/__generated__/graphql";
// import {Url} from "next/dist/shared/lib/router/router";
import Image from "next/image";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
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
  return (
    <div
      style={{background: backgroundColor || undefined}}
      className={twMerge(
        "group relative z-10 flex min-h-[450px] cursor-pointer  flex-col justify-between rounded-[5px] border border-primary-blue-main p-6 transition-all duration-300 ",
        !hoverImage && "hover:bg-primary-midBlue-main",
        className
      )}
      {...props}>
      {link ? (
        <Link
          {...getAcfLinkProps(link)}
          className={`absolute inset-0 z-[10] h-full w-full items-center gap-x-4 text-primary-blue-main transition-all duration-300
          ${!backgroundColor && "group-hover:text-secondary-offWhite-white"}
          `}></Link>
      ) : null}
      {hoverImage && (
        <>
          <Image
            fill
            alt="hover image"
            className="z-0 opacity-0 group-hover:opacity-80"
            src={hoverImage}
          />
          <div className="z-5 absolute left-0 top-0 h-full w-full bg-black/40"></div>
        </>
      )}
      <CardShape
        alt="shape"
        className={`absolute right-0 top-0 scale-x-0 opacity-0 transition-all duration-500  ${
          !backgroundColor && "group-hover:scale-x-100 group-hover:opacity-100"
        }`}
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
          className="mx-auto my-14 h-1/4"
          alt="icon image"
        />
      )}
      <div className="relative z-10 flex h-2/5 flex-col justify-between">
        <p
          style={{color: backgroundColor ? "#140F24" : undefined}}
          className="mb-0 line-clamp-4 text-lg font-light leading-[25px] text-secondary-offWhite-white"
          title={description || ""}>
          {description}
        </p>
        {link ? (
          <Link
            {...getAcfLinkProps(link)}
            className="inline-flex items-center gap-x-4 text-primary-blue-main transition-all duration-300 group-hover:text-secondary-offWhite-white">
            Read more
            <ArrowRight className="h-[22px] w-[22px] shrink-0 [&_path]:text-primary-blue-main [&_path]:transition-all [&_path]:duration-300 group-hover:[&_path]:text-secondary-offWhite-white" />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
