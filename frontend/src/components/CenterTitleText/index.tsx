import {CenterTitleText} from "@/__generated__/graphql";
import React from "react";
import parse from "html-react-parser";
const CenterTitleTextBlock = (props: CenterTitleText) => {
  return (
    <div className="container-fluid py-20 pb-0 text-center md:pb-10 xl:py-28 xl:pb-20">
      <h2 className="mb-8 text-4xl font-bold xl:text-6xl 2xl:text-[64px] 2xl:leading-[84px]">
        {props.title}
      </h2>
      <p className="mx-auto max-w-[817px] text-base font-light lg:text-lg">
        {props.text && parse(props.text)}
      </p>
    </div>
  );
};

export default CenterTitleTextBlock;
