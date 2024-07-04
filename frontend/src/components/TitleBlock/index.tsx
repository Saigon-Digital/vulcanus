import React, {ReactNode, useEffect, useRef, useState} from "react";
import {TitleBlockFragment} from "@/__generated__/graphql";
import dynamic from "next/dynamic";
import {motion} from "framer-motion";
import clsx from "clsx";
import {twMerge} from "tailwind-merge";
const TitleShape = dynamic(() =>
  import("../Icons").then((mod) => mod.TitleShape)
);

const TitleBlock: React.FC<TitleBlockFragment> = ({
  title,
  haveShape,
  haveBorderBottom,
  textSize = ["large"],
}) => {
  const size = textSize?.find((_, id) => id === 0) || textSize || "large";
  const titleRef = useRef<HTMLDivElement>(null);

  return (
    //#region
    <section className=" relative">
      <div
        className={`title-block container-fluid  grid grid-cols-12 py-10 md:py-14 lg:py-20 ${
          haveBorderBottom && " border-b border-[#E6ECF3]"
        }`}>
        <div
          ref={titleRef}
          className={twMerge(
            "title col-span-full max-w-[1565px]  font-bold md:col-span-10 xl:text-6xl 3xl:col-span-9 [&>*]:text-3xl [&>*]:tracking-tight ",
            size === "large"
              ? "[&>*]:text 2xl:leading-[76px] 3xl:leading-[89px] 3xl:[&>*]:text-[64px] 3xl:[&>*]:leading-[89px]"
              : "2xl:leading-[67px] xl:[&>*]:text-5xl 2xl:[&>*]:leading-[67px]"
          )}
          dangerouslySetInnerHTML={{__html: title || ""}}></div>
        {haveShape && (
          <div>
            <TitleShape
              h={150}
              w={150}
              className="absolute -right-[10px] top-1/2 hidden -translate-y-1/2 lg:block"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default TitleBlock;
