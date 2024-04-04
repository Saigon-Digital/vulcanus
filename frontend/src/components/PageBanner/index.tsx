import React from "react";
import {PageBannerFragment} from "@/__generated__/graphql";
import parse from "html-react-parser";
import Image from "next/image";
import Parallax from "../Parallax";
const PageBanner: React.FC<PageBannerFragment> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="container-fluid pb-10 lg:pb-16">
      <div className="flex flex-wrap items-center justify-between gap-y-5 py-10 ">
        {title && (
          <h1 className="text-4xl font-bold text-white lg:text-5xl 2xl:text-[64px] 2xl:leading-[89px]">
            {title}
          </h1>
        )}
        {description && (
          <div className="w-full text-lg font-[300] md:w-1/2 md:text-xl [&>*>strong]:font-medium xl:[&>*]:text-xl">
            {description && parse(description)}
          </div>
        )}
      </div>
      {image && (
        <div
          // style={{
          //   backgroundImage: `url(${image?.node?.sourceUrl}` || "",
          // }}
          className="parallax relative aspect-[2/1] w-full object-cover lg:aspect-[1400/800]">
          <Parallax
            from={-20}
            to={40}
            className="absolute h-full w-full overflow-hidden "
            targetClass="h-[120%]">
            <Image
              fill
              loading="eager"
              src={image?.node?.sourceUrl || ""}
              alt="banner img"
              className="object-cover"
            />
          </Parallax>
        </div>
      )}
    </div>
  );
};

export default PageBanner;
