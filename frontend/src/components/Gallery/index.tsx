import React from "react";

import {GalleryBlock} from "@/__generated__/graphql";
import clsx from "clsx";
import Image from "next/image";
import parse from "html-react-parser";
const Gallery = ({title, gallery, reverseLayout}: GalleryBlock) => {
  return (
    <div className="relative py-20 lg:pb-28">
      <div className="container-fluid grid grid-cols-12 gap-5 lg:gap-6">
        <div className="relative col-span-full flex justify-start text-left md:col-span-3 md:justify-center">
          <Image
            src={"/shapes/left-shape.svg"}
            width={47}
            height={155}
            alt="shape"
            className="absolute -left-[25px] -top-5 hidden  md:block"
          />
          <h4 className="w-4/5 max-w-[279px] text-center text-2xl font-bold tracking-tight xl:text-left xl:text-3xl 2xl:w-3/4  2xl:text-5xl 2xl:leading-[67px]">
            {title}
          </h4>
        </div>
        <div className={`col-span-full grid grid-cols-4 gap-5 md:col-span-9 `}>
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
                    <div className="relative h-[200px] w-full lg:h-[300px]">
                      <Image
                        fill
                        src={ele?.galleryImage?.node?.sourceUrl || ""}
                        className="object-cover"
                        alt="gallery image"
                      />
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
                    <h5 className="mb-3 text-xl font-bold text-primary-midBlue-main 2xl:text-2xl">
                      {ele?.text?.title}
                    </h5>
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
