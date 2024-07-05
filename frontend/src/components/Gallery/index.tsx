import React, {RefObject, useLayoutEffect, useRef} from "react";

import {GalleryBlock} from "@/__generated__/graphql";
import clsx from "clsx";
import {motion} from "framer-motion";
import dynamic from "next/dynamic";
import {twMerge} from "tailwind-merge";
import {useRouter} from "next/router";
import {allLowercase} from "@/utils";
import {useMediaQuery} from "@/hooks/useMediaQuery";
const Image = dynamic(() => import("next/image"));
const zoomOut = [];
const Gallery = ({title, gallery, reverseLayout}: GalleryBlock) => {
  const params = useRouter().asPath;
  const ref = useRef(null);
  // const isMobile = useMediaQuery("()")
  const scrollTo = (element: RefObject<HTMLDivElement>) => {
    if (typeof document === undefined || typeof window === undefined) return;

    if (element.current) {
      const top =
        element?.current?.getBoundingClientRect().top + window.pageYOffset - 80;

      window.scrollTo({top: top, behavior: "smooth"});
    }
  };

  useLayoutEffect(() => {
    if (params) {
      const pSplit = params.split("#");
      let id = pSplit.at(pSplit.length - 1)?.toLowerCase();
      // console.log(pSplit);
      var fixedstring;

      try {
        // If the string is UTF-8, this will work and not throw an error.
        fixedstring = encodeURIComponent(
          title?.toLocaleLowerCase().replaceAll(" ", "") || ""
        );
      } catch (e) {
        // If it isn't, an error will be thrown, and we can assume that we have an ISO string.
        fixedstring = title?.toLocaleLowerCase().replaceAll(" ", "");
      }
      id = allLowercase(id || "");
      fixedstring = allLowercase(fixedstring || "");

      if (
        id === fixedstring ||
        (id && fixedstring && fixedstring?.includes(id))
      ) {
        scrollTo(ref);
      }
    }
  }, [params]);
  return (
    <div ref={ref} className="relative py-14 md:py-20 lg:pb-28">
      <div className="relative">
        <Image
          src={"/shapes/left-shape.svg"}
          width={47}
          height={155}
          alt="shape"
          className="absolute -left-[3px] -top-5 hidden  md:block"
        />

        <div className="container-fluid grid grid-cols-12 gap-5 gap-y-6 lg:gap-6">
          <div className="relative col-span-full flex justify-start text-left md:justify-start xl:col-span-3 2xl:col-span-3">
            <h2 className="max-w-[579px] whitespace-pre-wrap break-words text-left  text-2xl font-bold  tracking-tight md:ml-[50px] xl:ml-10 xl:text-left xl:text-2xl 2xl:w-[4/5] 2xl:text-3xl  3xl:text-4xl 3xl:leading-[67px]">
              {title}
            </h2>
          </div>
          <div
            className={`col-span-full grid grid-cols-6 gap-5 md:ml-[50px] lg:col-span-11  lg:grid-cols-8  xl:col-span-8 xl:col-start-5 xl:ml-0    `}>
            {gallery?.map((ele, id) => {
              return (
                <div
                  key={id}
                  className={twMerge(
                    "col-span-full flex flex-col justify-start gap-3 rounded-[5px] border  border-primary-blue-main p-3 sm:col-span-3 sm:p-3 lg:col-span-2 xl:p-5 3xl:p-6 ",
                    !reverseLayout
                      ? id === 1 || id === 2
                        ? "lg:col-span-5"
                        : "lg:col-span-3 "
                      : id === 0 || id === 3
                        ? "lg:col-span-5"
                        : "lg:col-span-3",
                    id === 2 && gallery.length < 4 ? "lg:col-span-full" : "",
                    ele?.textOrImge === "text" &&
                      "border-none bg-primary-blue-100 text-primary-midBlue-main"
                  )}>
                  {ele?.textOrImge === "image" ? (
                    <>
                      <div className="relative h-[390px]  w-full overflow-hidden  lg:h-[420px] 2xl:h-[500px] 3xl:h-[550px] ">
                        <div className="relative h-full w-full">
                          <Image
                            fill
                            src={ele?.galleryImage?.node?.sourceUrl || ""}
                            className="object-cover  object-center"
                            alt="gallery image"
                          />
                        </div>
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
                      <p className="text-base xl:text-lg">
                        {ele?.text?.content}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
