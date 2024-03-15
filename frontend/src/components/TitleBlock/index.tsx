import React from "react";
import {TitleBlockFragment} from "@/__generated__/graphql";
import parse, {HTMLReactParserOptions, Element} from "html-react-parser";
import {TitleShape} from "../Icons";

const TitleBlock: React.FC<TitleBlockFragment> = ({
  title,
  haveShape,
  haveBorderBottom,
}) => {
  return (
    <section className="relative">
      <div
        className={`title-block container-fluid   py-16 lg:py-20 ${
          haveBorderBottom && " border-b border-[#E6ECF3]"
        }`}>
        <div className="max-w-[1000px] text-4xl font-bold xl:text-5xl 2xl:leading-[67px]">
          {title && parse(title)}
        </div>
        {haveShape && (
          <TitleShape
            h={200}
            w={200}
            className="absolute -right-5 top-1/2 hidden -translate-y-1/2 lg:block"
          />
        )}
      </div>
    </section>
  );
};

export default TitleBlock;
