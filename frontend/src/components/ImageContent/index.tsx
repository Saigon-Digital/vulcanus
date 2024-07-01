import {ImageContentBlock} from "@/__generated__/graphql";
import {useLocaleContext} from "@/context/LocaleContext";
import {useRatio} from "@/hooks/useRatio";
import {allLowercase} from "@/utils";

import {m} from "framer-motion";

import Image from "next/image";

import {useRouter} from "next/router";
import {RefObject, useEffect, useRef} from "react";
const ImageContent = ({
  image,
  contentGroup: content,
  reverse,
}: ImageContentBlock) => {
  const params = useRouter().asPath;
  const ref = useRef<HTMLDivElement>(null);

  const scrollTo = (element: RefObject<HTMLDivElement>) => {
    if (typeof document === undefined || typeof window === undefined) return;

    if (element.current) {
      const top =
        element?.current?.getBoundingClientRect().top + window.pageYOffset - 80;

      window.scrollTo({top: top, behavior: "smooth"});
    }
  };

  useEffect(() => {
    if (params) {
      const pSplit = params.split("#");
      const id = pSplit.at(pSplit.length - 1)?.toLowerCase();
      // console.log(pSplit);
      var fixedstring;

      try {
        // If the string is UTF-8, this will work and not throw an error.
        fixedstring = encodeURIComponent(
          content?.title?.toLocaleLowerCase() || ""
        );
      } catch (e) {
        // If it isn't, an error will be thrown, and we can assume that we have an ISO string.
        fixedstring = content?.title?.toLocaleLowerCase();
      }
      console.log("id", id, fixedstring);
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
    <div ref={ref} className="container py-10 lg:px-20 lg:py-20">
      <div
        className={`flex flex-wrap gap-y-10 ${
          reverse ? "flex-row-reverse" : "flex-row"
        }`}>
        <div
          style={{height: "fit-content"}}
          className="relative flex min-h-[350px] w-full flex-col justify-center rounded-[5px] border border-primary-blue-main p-0 lg:w-1/2 xl:min-h-[450px] 3xl:min-h-[550px]">
          <Image
            src="/shapes/imageShape.png"
            height={155}
            width={47}
            alt="image shape"
            className={`absolute  object-cover ${
              reverse ? "-left-[45px] rotate-180" : "-right-[45px]"
            } top-5 hidden w-[45px] lg:block`}
          />
          <div className="relative my-auto aspect-[742/580] w-full  overflow-hidden  lg:p-6">
            <m.div
              whileInView={{scale: 1}}
              transition={{type: "spring", duration: 1.5, delay: 0.3}}
              className="relative h-full w-full overflow-hidden">
              <Image
                fill
                className="object-cover"
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
