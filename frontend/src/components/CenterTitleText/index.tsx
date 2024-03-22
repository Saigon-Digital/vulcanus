import {CenterTitleText} from "@/__generated__/graphql";
import React from "react";
import parse from "html-react-parser";
const CenterTitleTextBlock = (props: CenterTitleText) => {
  return (
    <div className="container-fluid py-20 text-center xl:py-28 xl:pb-20">
      <h2 className="mb-8 text-4xl font-bold xl:text-6xl">{props.title}</h2>
      <p className="mx-auto max-w-[817px] text-base font-light lg:text-lg">
        {props.text && parse(props.text)}
      </p>
    </div>
  );
};

export default CenterTitleTextBlock;
