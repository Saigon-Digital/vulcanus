import React, {RefObject, useLayoutEffect, useRef} from "react"

import {GalleryBlock} from "@/__generated__/graphql"

import dynamic from "next/dynamic"
import {twMerge} from "tailwind-merge"
import {useRouter} from "next/router"
import {allLowercase} from "@/utils"
import Link from "next/link"
import GalleryFullWidth from "./GalleryFullWidth"

const Image = dynamic(() => import("next/image"))
const Gallery = ({
  title,
  gallery,
  fullWidthLayout,
  reverseLayout,
}: GalleryBlock) => {
  const params = useRouter().asPath
  const ref = useRef(null)
  // const isMobile = useMediaQuery("()")
  const scrollTo = (element: RefObject<HTMLDivElement>) => {
    if (typeof document === undefined || typeof window === undefined) return

    if (element.current) {
      const top =
        element?.current?.getBoundingClientRect().top + window.pageYOffset - 80

      window.scrollTo({top: top, behavior: "smooth"})
    }
  }

  useLayoutEffect(() => {
    if (params) {
      const pSplit = params.split("#")
      let id = pSplit.at(pSplit.length - 1)?.toLowerCase()
      // console.log(pSplit);
      var fixedstring

      try {
        // If the string is UTF-8, this will work and not throw an error.
        fixedstring = encodeURIComponent(
          title?.toLocaleLowerCase().replaceAll(" ", "") || ""
        )
      } catch (e) {
        // If it isn't, an error will be thrown, and we can assume that we have an ISO string.
        fixedstring = title?.toLocaleLowerCase().replaceAll(" ", "")
      }
      id = allLowercase(id || "")
      fixedstring = allLowercase(fixedstring || "")

      if (
        id === fixedstring ||
        (id && fixedstring && fixedstring?.includes(id))
      ) {
        scrollTo(ref)
      }
    }
  }, [params])

  const linkToUri = (link: string) => {
    return link.replace("https://www.vulcanus-stahl.de", "")
  }
  if (fullWidthLayout)
    return (
      <GalleryFullWidth
        title={title}
        reverseLayout={reverseLayout}
        gallery={gallery}
      />
    )
  return (
    <div ref={ref} className="relative py-14 md:py-20 lg:pb-24">
      <div className="relative">
        <Image
          src={"/shapes/left-shape.svg"}
          width={47}
          height={155}
          alt="shape"
          className="absolute -left-[3px] -top-5 hidden  md:block"
        />

        <div className="container-fluid grid grid-cols-12 gap-5 gap-y-6 lg:gap-6">
          <div className="relative col-span-full flex flex-col justify-start text-left md:justify-start xl:col-span-3 2xl:col-span-3">
            <h2 className="max-w-[579px] text-left text-3xl font-bold md:ml-[50px] xl:ml-10 xl:text-left xl:text-5xl xl:leading-[67px] 2xl:w-[4/5]">
              {title}
            </h2>
            <div className="mb-10 md:ml-[50px] xl:mb-0 xl:ml-10">
              {gallery?.map((ele, id) => {
                if (ele?.textOrImge === "text")
                  return (
                    <>
                      <div className="" key={id}>
                        <h2 className="mb-8 text-xl font-bold text-primary-blue-200">
                          {ele?.text?.title}
                        </h2>
                        <p className="text-primary-blue-200">
                          {ele?.text?.content}
                        </p>
                      </div>
                      {ele?.text?.button && (
                        <Link
                          href={linkToUri(ele?.text?.button?.url || "/")}
                          className="fit-content mt-8 inline-flex w-[fit-content] items-center justify-center whitespace-nowrap bg-primary-blue-main px-10 py-[17px] text-center font-bold uppercase leading-[125%] text-secondary-offWhite-white transition-all duration-300 hover:bg-primary-blue-400 lg:px-[60px] xl:mt-16">
                          {ele?.text?.button?.title}
                        </Link>
                      )}
                    </>
                  )
              })}
            </div>
          </div>
          <div
            className={`col-span-full grid grid-cols-6 gap-5 md:ml-[50px] lg:col-span-11  lg:grid-cols-8  xl:col-span-8 xl:col-start-5 xl:ml-0    `}>
            {gallery?.map((ele, id) => {
              if (ele?.textOrImge === "image")
                return (
                  <div
                    key={id}
                    className={twMerge(
                      "col-span-full flex flex-col justify-start gap-3 rounded-[5px] border  border-primary-blue-main p-3 sm:col-span-3 sm:p-3 lg:col-span-2 xl:p-5 3xl:p-6 ",
                      id === 0 && "lg:col-span-3",
                      id === 1 && "lg:col-span-5",

                      id === 2 && "lg:col-span-8"
                    )}>
                    <>
                      <div className="relative h-[352px]  w-full overflow-hidden">
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
                  </div>
                )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
