import {CtaBannerBlockFragment} from "@/__generated__/graphql";
import React from "react";
import Image from "next/image";
import {ShapeTopRight} from "../Icons";
import Button from "../Button";
const CTABannerBlock = ({
  bannerImage,
  bgColor,
  cta,
  title,
}: CtaBannerBlockFragment) => {
  return (
    <div className="container-fluid">
      <div
        style={{background: bgColor || "transparent"}}
        className=" relative p-6">
        <ShapeTopRight className="absolute right-0 top-0 w-[135px]" />
        <div className="flex flex-wrap">
          <div className="flex w-full justify-start pr-10 lg:w-1/2 lg:pr-20">
            {bannerImage && (
              <Image
                width={734}
                height={462}
                src={bannerImage.node?.sourceUrl || ""}
                alt="banner image"
                className="aspect-[736/462] w-full max-w-[734px]"
              />
            )}
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-8 lg:w-1/2">
            <h3 className="max-w-[750px] text-4xl font-bold text-primary-midBlue-main xl:text-5xl xl:leading-[67px]">
              {title}
            </h3>
            {cta && <Button href={cta.ctaText as string}>{cta.ctaText}</Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABannerBlock;
