import Image from "next/image"
import React from "react"
import {motion} from "framer-motion";
import { ImageContentBlock } from "@/__generated__/graphql";
function ImageContentFullWidth({image, contentGroup: content, reverse}:ImageContentBlock) {
  return (
    <div className="relative mb-10 xl:mb-20">
      <Image
          src={"/shapes/left-shape.svg"}
          width={47}
          height={155}
          alt="shape"
          className="absolute -left-[3px] top-16 hidden  md:block"
        />
      <div className="container-fluid">
      <div
        className={`flex flex-col justify-between flex-wrap gap-y-10 ${
          reverse ? "flex-col-reverse lg:flex-row-reverse" : "flex-col lg:flex-row"
        }`}>
        <div
          style={{height: "fit-content"}}
          className="relative flex w-full flex-col justify-center rounded-[5px] border border-primary-blue-main p-0 lg:w-[60%]">
          <Image
            src="/shapes/imageShape.png"
            height={155}
            width={47}
            alt="image shape"
            className={`absolute  object-cover ${
              !reverse ? "-left-[45px] rotate-180" : "-right-[45px]"
            } top-5 hidden w-[45px] lg:block`}
          />
          <div className="relative mx-auto my-auto aspect-[1082/580] w-[calc(100%-20px)] overflow-hidden lg:p-6 xl:w-[calc(100%-16px)]">
            <motion.div
              whileInView={{scale: 1}}
              transition={{type: "spring", duration: 1.5, delay: 0.3}}
              className="relative h-full w-full rounded-md overflow-hidden">
              <Image
                fill
                className="object-cover "
                src={image?.node?.sourceUrl || ""}
                alt="banner image"
              />
            </motion.div>
          </div>
        </div>
        <div
          className={`flex w-full flex-col items-start justify-center gap-5 lg:w-1/3 xl:pl-10`}>
          <h3 className="text-4xl font-bold xl:text-5xl xl:leading-[67px]">
            {content?.title}
          </h3>
          {content?.description && (
            <div
              dangerouslySetInnerHTML={{__html: content.description}}
              className="xl:[&>*>*]:text-xl [&>*]:!text-primary-blue-200 [&>*]:font-normal xl:[&>*]:text-xl xl:[&>p]:text-lg [&>strong]:font-bold [&>ul]:list-disc [&>ul]:pl-5 "></div>
          )}
          {content?.icons && content?.icons?.length > 0 && (
            <div className="flex  justify-center  gap-4 xl:gap-10 2xl:gap-20">
              {content.icons.map((ele, index) => {
                return (
                  <div
                    key={index}
                    className="mt-5 flex flex-col justify-start  gap-6 text-center">
                    <Image
                      src={ele?.icon?.node?.sourceUrl || ""}
                      width={98}
                      height={98}
                      className="mx-auto aspect-square w-full max-w-[80px]"
                      alt="icon image"
                    />
                    <p>{ele?.text}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
    
  )
}

export default ImageContentFullWidth
