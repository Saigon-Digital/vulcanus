import {ImageContentBlock} from "@/__generated__/graphql";

import {m} from "framer-motion";
import LazyImport from "../LazyImport";
import Image from "next/image";
const ImageContent = ({
  image,
  contentGroup: content,
  reverse,
}: ImageContentBlock) => {
  return (
    <div className="container py-10 lg:px-20 lg:py-20">
      <div
        className={`flex flex-wrap gap-y-10 ${
          reverse ? "flex-row-reverse" : "flex-row"
        }`}>
        <div
          style={{height: "fit-content"}}
          className="relative w-full rounded-[5px] border border-primary-blue-main p-4 lg:w-1/2">
          <Image
            src="/shapes/imageShape.png"
            height={155}
            width={47}
            alt="image shape"
            className={`absolute  ${
              reverse ? "-left-[45px] rotate-180" : "-right-[45px]"
            } top-5 hidden w-[45px] lg:block`}
          />
          <div className="relative aspect-[700/400]  overflow-hidden  lg:p-6">
            <m.div
              whileInView={{scale: 1.15}}
              transition={{type: "spring", duration: 1.5, delay: 0.3}}
              className="relative h-full w-full">
              <Image
                fill
                src={image?.node?.sourceUrl || ""}
                alt="banner image"
              />
            </m.div>
          </div>
        </div>
        <div
          className={`flex w-full flex-col items-start justify-center gap-5 lg:w-1/2 ${
            reverse ? " md:pr-20 xl:pr-28" : "md:pl-20 xl:pl-28"
          }`}>
          <h3 className="text-4xl font-bold xl:text-5xl xl:leading-[67px]">
            {content?.title}
          </h3>
          {content?.description && (
            <div
              dangerouslySetInnerHTML={{__html: content.description}}
              className="xl:[&>*>*]:text-xl [&>*>strong]:!text-primary-blue-main [&>*]:font-normal xl:[&>*]:text-xl [&>strong]:font-bold [&>ul]:list-disc [&>ul]:pl-5 "></div>
          )}
          {content?.icons && content?.icons?.length > 0 && (
            <div className="flex  justify-center gap-10 2xl:gap-20">
              {content.icons.map((ele, index) => {
                return (
                  <LazyImport
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
                  </LazyImport>
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
