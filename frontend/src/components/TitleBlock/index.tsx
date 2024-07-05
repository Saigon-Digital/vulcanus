import React, {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import {TitleBlockFragment} from "@/__generated__/graphql";
import dynamic from "next/dynamic";

import {twMerge} from "tailwind-merge";
const TitleShape = dynamic(() =>
  import("../Icons").then((mod) => mod.TitleShape)
);
const ScrollMargin = 350;
const TitleBlock: React.FC<TitleBlockFragment> = ({
  title,
  haveShape,
  haveBorderBottom,
  textSize = ["large"],
}) => {
  const size = textSize?.find((_, id) => id === 0) || textSize || "large";

  const id = `title-block-${encodeURIComponent(title || "")}`;

  const titleRef = useRef<HTMLDivElement>(null);
  const [initialHeight, setInitialHeight] = useState<number | null>(null);
  const [isInit, setIsInit] = useState<boolean>(false);
  //#region footer setting

  const [rectTop, setRectTop] = useState<number | null>();
  const ref = useRef<HTMLDivElement>(null);

  const ratio = useMemo(() => {
    if (initialHeight && rectTop)
      return ((Math.abs(initialHeight) - rectTop) * 100) / ScrollMargin;
  }, [initialHeight, rectTop]);

  // console.log("ratio ", Math.abs(ratio || 0));
  // console.log("init ", initialHeight, "top ", rectTop);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((ele) => {
        if (!ele && !ref.current) return;
        const calcTop = () => {
          const rect = ref.current?.getBoundingClientRect();
          const top = rect ? rect.top : 0;
          setRectTop(top);
        };

        if (ele.isIntersecting) {
          let height = ele.boundingClientRect.top;
          if (!isInit) {
            setIsInit(true);
            setInitialHeight(height);
          }
          document.addEventListener("scroll", calcTop);
        } else {
          document.removeEventListener("scroll", calcTop);
        }
      });
    };
    const observer = new IntersectionObserver(callback, {
      threshold: 0.9,
      rootMargin: "100px",
    });
    if (ref.current && typeof document !== undefined) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
        observer.disconnect();
      }
    };
  }, []);
  return (
    //#region
    <div key={id} id={id} ref={ref} className=" relative">
      <div
        className={`title-block container-fluid  grid grid-cols-12 py-10 md:py-14 lg:py-20 ${
          haveBorderBottom && " border-b border-[#E6ECF3]"
        }`}>
        <div
          ref={titleRef}
          className={twMerge(
            "scroll-title col-span-full max-w-[1565px]  font-bold md:col-span-10 xl:text-6xl 3xl:col-span-9 [&>*]:text-3xl [&>*]:tracking-tight ",
            size === "large"
              ? "[&>*]:text 2xl:leading-[76px] 3xl:leading-[89px] 3xl:[&>*]:text-[64px] 3xl:[&>*]:leading-[89px]"
              : "2xl:leading-[67px] xl:[&>*]:text-5xl 2xl:[&>*]:leading-[67px]",
            ratio &&
              `scroll-${
                ratio > 0 ? (ratio < 100 ? Math.floor(ratio) : 100) : 0
              }`
          )}
          dangerouslySetInnerHTML={{__html: title || ""}}></div>
        {haveShape && (
          <div>
            <TitleShape
              h={150}
              w={150}
              className="absolute -right-[10px] top-1/2 hidden -translate-y-1/2 lg:block"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleBlock;
