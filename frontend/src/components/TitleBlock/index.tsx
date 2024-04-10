import React, {ReactNode, useEffect, useRef, useState} from "react";
import {TitleBlockFragment} from "@/__generated__/graphql";

import {TitleShape} from "../Icons";
import {motion} from "framer-motion";
import clsx from "clsx";

const TitleBlock: React.FC<TitleBlockFragment> = ({
  title,
  haveShape,
  haveBorderBottom,
  textSize = ["large"],
}) => {
  const size = textSize?.find((_, id) => id === 0) || textSize || "large";
  const titleRef = useRef<HTMLDivElement>(null);

  return (
    <section className="container-fluid relative">
      <div
        className={`title-block   grid grid-cols-12 py-16 lg:py-20 ${
          haveBorderBottom && " border-b border-[#E6ECF3]"
        }`}>
        <motion.div
          style={{y: 50, opacity: 0}}
          whileInView={{y: 0, opacity: 1}}
          viewport={{margin: "50%"}}
          transition={{duration: 0.8, delay: 0.4}}
          ref={titleRef}
          className={clsx(
            "title col-span-full max-w-[1165px]  font-bold md:col-span-10 xl:text-5xl 3xl:col-span-8 [&>*]:text-4xl [&>*]:tracking-tight ",
            size === "large"
              ? "2xl:leading-[89px] 2xl:[&>*]:text-[64px] 2xl:[&>*]:leading-[89px]"
              : "2xl:leading-[67px] xl:[&>*]:text-5xl 2xl:[&>*]:leading-[67px]"
          )}
          dangerouslySetInnerHTML={{__html: title || ""}}></motion.div>
        {haveShape && (
          <TitleShape
            h={200}
            w={200}
            className="absolute -right-[10px] top-1/2 hidden -translate-y-1/2 lg:block"
          />
        )}
      </div>
    </section>
  );
};

export default TitleBlock;
