import React from "react";
import {TitleBlockFragment} from "@/__generated__/graphql";
import parse, {HTMLReactParserOptions, Element} from "html-react-parser";
import {TitleShape} from "../Icons";

const TitleBlock: React.FC<TitleBlockFragment> = ({title, haveShape}) => {
  return (

    <div className="title-block container border-b border-[#E6ECF3] py-16 lg:py-20">
      <div className="max-w-[1000px] text-5xl font-bold">

        {title && parse(title)}
      </div>
      {haveShape && (
        <TitleShape
          h={200}
          w={200}
          className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
        />
      )}
    </div>
  );
};

export default TitleBlock;
