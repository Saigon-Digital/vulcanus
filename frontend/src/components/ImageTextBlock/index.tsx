import React from "react";
import {ImageTextBlock} from "@/__generated__/graphql";
import Image from "next/image";
const ImageText: React.FC<ImageTextBlock> = ({
  textRepeater,
  rightImage,
  leftImage,
}) => {
  return (
    <div className="container py-20">
      <div className="grid grid-cols-4 gap-x-5 gap-y-10">
        <p className="col-span-full md:col-span-2  md:col-start-3">
          {textRepeater && textRepeater[0]?.text}
        </p>
        <div className="relative col-span-full h-[360px] md:col-span-2 lg:col-span-1 ">
          <Image
            src={leftImage?.node?.sourceUrl || ""}
            fill
            alt="left image"
            className="object-cover"
          />
        </div>
        <div className="relative col-span-full h-[360px]  md:col-span-2 md:col-start-3 ">
          <Image
            src={rightImage?.node?.sourceUrl || ""}
            fill
            className="object-cover"
            alt="left image"
          />
        </div>
        <div className="col-span-full flex gap-5 md:col-span-2 md:col-start-3">
          {textRepeater &&
            textRepeater.slice(1, textRepeater.length).map((ele, id) => {
              return <p key={id}>{ele?.text}</p>;
            })}
        </div>
      </div>
    </div>
  );
};

export default ImageText;
