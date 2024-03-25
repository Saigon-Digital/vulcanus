import React from "react";
import {TitleBlockFragment} from "@/__generated__/graphql";
import parse, {HTMLReactParserOptions, Element} from "html-react-parser";
import {TitleShape} from "../Icons";
import clsx from "clsx";
const TitleBlock: React.FC<TitleBlockFragment> = ({
  title,
  haveShape,
  haveBorderBottom,
  textSize = ["large"],
}) => {
  console.log("textSize", textSize);
  const size = textSize?.find((_, id) => id === 0) || textSize || "large";
  return (
    <section className="container-fluid relative">
      <div
        className={`title-block   grid grid-cols-12 py-16 lg:py-20 ${
          haveBorderBottom && " border-b border-[#E6ECF3]"
        }`}>
        <div
          className={clsx(
            "title col-span-full max-w-[1165px]  font-bold md:col-span-10 xl:text-5xl 3xl:col-span-8 [&>*]:text-4xl [&>*]:tracking-tight ",
            size === "large"
              ? "2xl:leading-[89px] 2xl:[&>*]:text-[64px] 2xl:[&>*]:leading-[89px]"
              : "2xl:leading-[67px] xl:[&>*]:text-5xl 2xl:[&>*]:leading-[67px]"
          )}>
          {title && parse(title)}
        </div>
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
