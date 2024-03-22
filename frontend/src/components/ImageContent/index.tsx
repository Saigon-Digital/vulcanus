import {ImageContentBlock} from "@/__generated__/graphql";
import Image from "next/image";
import React from "react";
import {ImageShape} from "../Icons";
import parse from "html-react-parser";
const ImageContent = ({image, content, reverse}: ImageContentBlock) => {
  return (
    <div className="container py-10 md:py-[54px] lg:px-20">
      <div
        className={`flex flex-wrap gap-y-10 ${
          reverse ? "flex-row-reverse" : "flex-row"
        }`}>
        <div
          style={{height: "fit-content"}}
          className="relative w-full rounded-[5px] border border-primary-blue-main p-4 lg:w-1/2">
          <ImageShape
            className={`absolute  ${
              reverse ? "-left-[45px] rotate-180" : "-right-[45px]"
            } top-5 hidden w-[45px] lg:block`}
          />
          <div className="relative aspect-[700/400]  lg:p-6">
            <Image fill src={image?.node?.sourceUrl || ""} alt="banner image" />
          </div>
        </div>
        <div
          className={`flex w-full flex-col items-start justify-center gap-5 lg:w-1/2 ${
            reverse ? " md:pr-20 xl:pr-28" : "md:pl-20 xl:pl-28"
          }`}>
          <h4 className="text-4xl font-bold xl:text-5xl xl:leading-[67px]">
            {content?.title}
          </h4>
          <div className="[&>*>strong]:!text-primary-blue-main xl:[&>*]:text-[20px] 2xl:[&>*]:leading-[28px] [&>strong]:font-bold [&>ul]:list-disc [&>ul]:pl-5 ">
            {content?.description && parse(content.description)}
          </div>
          {content?.icons && content?.icons?.length > 0 && (
            <div className="flex  justify-center gap-10 2xl:gap-20">
              {content.icons.map((ele, index) => {
                return (
                  <div
                    key={index}
                    className="mt-5 flex flex-col justify-center text-center">
                    <Image
                      src={ele?.icon?.node?.sourceUrl || ""}
                      width={98}
                      height={98}
                      className="mx-auto"
                      alt="icon image"
                    />
                    <p>{ele?.text}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageContent;
