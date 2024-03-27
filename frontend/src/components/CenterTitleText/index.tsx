import {CenterTitleText} from "@/__generated__/graphql";
import React from "react";
import parse from "html-react-parser";
const CenterTitleTextBlock = (props: CenterTitleText) => {
  return (
    <div className="container-fluid py-20 pb-10 text-center xl:py-28 xl:pb-14 ">
      <h2 className="mb-8 text-4xl font-bold xl:text-[64px] xl:leading-[89px]">
        {props.title}
      </h2>
      <div className="mx-auto max-w-[817px] text-base lg:text-lg [&>*>*]:font-light xl:[&>*]:text-[20px] xl:[&>*]:leading-[25px]">
        {props.text && parse(props.text)}
      </div>
    </div>
  );
};

export default CenterTitleTextBlock;
