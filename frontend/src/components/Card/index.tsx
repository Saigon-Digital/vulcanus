import {CardsBlockCards_Fields} from "@/__generated__/graphql";
import {getAcfLinkProps, getUrlPathname} from "@/utils";
import Link from "next/link";
import ArrowRight from "public/icons/arrow-right.svg";
import React from "react";
import {twMerge} from "tailwind-merge";
import CardShape from "./images/card-shape.svg";

type Props = CardsBlockCards_Fields & React.HTMLAttributes<HTMLDivElement>;

const Card: React.FC<Props> = ({
  title,
  description = "",
  className,
  ...props
}) => {
  console.log("props", props);
  return (
    <div
      className={twMerge(
        "group flex h-[400px] flex-col justify-between rounded-[5px] border border-primary-blue-main p-6 transition-all duration-300 hover:bg-primary-midBlue-main",
        className
      )}
      {...props}>
      <CardShape
        alt="shape"
        className="absolute right-0 top-0 scale-x-0 opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100"
        width={48}
        height={133}
      />
      <h3
        className="font-semibold leading-[140%] tracking-tight text-primary-blue-main transition-all
         duration-300 min-max-[20_24] group-hover:text-secondary-offWhite-white">
        {title}
      </h3>
      <div className="space-y-6">
        <p
          className="mb-5 line-clamp-4 text-lg font-light text-secondary-offWhite-white"
          title={description || ""}>
          {description}
        </p>
        {props?.link?.url && props?.link?.title ? (
          <Link
            {...getAcfLinkProps(props?.link)}
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
