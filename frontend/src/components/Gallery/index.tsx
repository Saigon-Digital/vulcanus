import React from "react";

import {GalleryBlock} from "@/__generated__/graphql";
import clsx from "clsx";
import Image from "next/image";
const Gallery = ({title, gallery}: GalleryBlock) => {
  console.log(gallery);

  return (
    <div className="py-20 lg:py-28">
      <div className="container-fluid grid grid-cols-12 gap-5 lg:gap-6">
        <div className="relative col-span-full flex justify-center text-left md:col-span-3">
          <Image
            src={"/shapes/left-shape.svg"}
            width={47}
            height={155}
            alt="shape"
            className="absolute -left-10  -top-5"
          />
          <h4 className="w-3/4 text-3xl font-bold md:text-4xl 2xl:text-5xl">
            {title}
          </h4>
        </div>
        <div className="col-span-full grid grid-cols-4 gap-5 md:col-span-9">
          {gallery?.map((ele, id) => {
            return (
              <div
                key={id}
                className={clsx(
                  "col-span-full flex flex-col gap-3 border border-primary-blue-main p-3 sm:col-span-2 xl:p-5 ",
                  id === 1 || id === 2 ? "lg:col-span-3" : "lg:col-span-1",
                  id === 2 && gallery.length < 4 ? "lg:col-span-full" : ""
                )}>
                <div className="relative h-[200px] w-full lg:h-[300px]">
                  <Image
                    fill
                    src={ele?.galleryImage?.node?.sourceUrl || ""}
                    className="object-cover"
                    alt="gallery image"
                  />
                </div>
                <span className="text-2xl text-primary-blue-main">
                  0{id + 1}
                </span>
                <p>{ele?.imageTitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;