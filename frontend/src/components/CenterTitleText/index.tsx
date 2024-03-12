import {CenterTitleText} from "@/__generated__/graphql";
import React from "react";
import parse from "html-react-parser";
const CenterTitleTextBlock = (props: CenterTitleText) => {
  return (
    <div className="container-fluid py-20 text-center xl:py-28">
      <h2 className="mb-8 text-4xl font-bold xl:text-6xl">{props.title}</h2>
      <p className="mx-auto max-w-[817px] text-base">
        {props.text && parse(props.text)}
      </p>
    </div>
  );
};

export default CenterTitleTextBlock;