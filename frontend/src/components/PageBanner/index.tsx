import React from "react";
import {PageBannerFragment} from "@/__generated__/graphql";
import parse from "html-react-parser";
import Image from "next/image";
const PageBanner: React.FC<PageBannerFragment> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="container-fluid pb-10 lg:pb-16">
      <div className="flex flex-wrap items-center justify-between gap-y-5 py-10 ">
        <h1 className="text-4xl font-bold text-white lg:text-5xl 2xl:text-[64px] 2xl:leading-[89px]">
          {title}
        </h1>
        <div className="[*>*>strong]:font-[500] w-full text-lg font-[300] md:w-1/2 md:text-xl xl:[&>*]:text-xl">
          {description && parse(description)}
        </div>
      </div>
      {image && (
        <div className="relative aspect-[2/1] w-full lg:aspect-[1800/800]">
          <Image
            fill
            src={image?.node?.sourceUrl || ""}
            alt="banner img"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default PageBanner;
