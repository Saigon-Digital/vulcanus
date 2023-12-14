import React from "react";
import {TitleBlockFragment} from "@/__generated__/graphql";
import parse, {HTMLReactParserOptions, Element} from "html-react-parser";

const TitleBlock: React.FC<TitleBlockFragment> = ({title}) => {
  //   console.log(title);

  return (
    <div className="title-block container py-16 lg:py-20">
      <div className="max-w-[1000px] text-5xl font-bold">
        {title && parse(title)}
      </div>
    </div>
  );
};

export default TitleBlock;
