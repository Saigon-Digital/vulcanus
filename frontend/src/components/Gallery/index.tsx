import React from "react";

import {GalleryBlock} from "@/__generated__/graphql";
import clsx from "clsx";
import {m} from "framer-motion";
import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));

const Gallery = ({title, gallery, reverseLayout}: GalleryBlock) => {
  return (
    <div className="relative py-20 lg:pb-28">
      <div className="container-fluid grid grid-cols-12 gap-5 lg:gap-6">
        <div className="relative col-span-full flex justify-start text-left md:col-span-4 md:justify-start 2xl:col-span-3">
          <Image
            src={"/shapes/left-shape.svg"}
            width={47}
            height={155}
            alt="shape"
            className="absolute -left-[25px] -top-5 hidden  md:block"
          />

          <h2 className="ml-[50px] max-w-[579px] whitespace-pre-wrap text-center text-2xl font-bold tracking-tight xl:text-left xl:text-3xl 2xl:w-[4/5]  2xl:text-5xl 2xl:leading-[67px]">
            {title}
          </h2>
        </div>
        <div
          className={`col-span-full grid grid-cols-4 gap-5 md:col-span-8 2xl:col-span-9 `}>
          {gallery?.map((ele, id) => {
            return (
              <div
                key={id}
                className={clsx(
                  "col-span-full flex flex-col gap-3 rounded-[5px] border border-primary-blue-main p-3 sm:col-span-2 xl:p-5 ",
                  !reverseLayout
                    ? id === 1 || id === 2
                      ? "lg:col-span-3"
                      : "lg:col-span-1"
                    : id === 0 || id === 3
                      ? "lg:col-span-3"
                      : "lg:col-span-1",
                  id === 2 && gallery.length < 4 ? "lg:col-span-full" : "",
                  ele?.textOrImge === "text" &&
                    "border-none bg-primary-blue-100 text-primary-midBlue-main"
                )}>
                {ele?.textOrImge === "image" ? (
                  <>
                    <div className="relative h-[200px] w-full overflow-hidden lg:h-[300px]">
                      <m.div
                        whileInView={{scale: 1.15}}
                        transition={{type: "spring", duration: 1.5, delay: 0.3}}
                        className="relative h-full w-full">
                        <Image
                          fill
                          src={ele?.galleryImage?.node?.sourceUrl || ""}
                          className="object-cover"
                          alt="gallery image"
                        />
                      </m.div>
                    </div>
                    <span className="text-2xl font-semibold  text-primary-blue-main">
                      0{id + 1}
                    </span>
                    <p className="lg:text-lg xl:text-xl xl:leading-[28px]">
                      {ele?.imageTitle}
                    </p>
                  </>
                ) : (
                  <div className="[&>p]:text-lg [&>p]:leading-[24px]">
                    <h3 className="mb-3 text-xl font-bold text-primary-midBlue-main 2xl:text-2xl">
                      {ele?.text?.title}
                    </h3>
                    <p>{ele?.text?.content}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
