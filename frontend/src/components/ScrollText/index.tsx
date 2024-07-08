import React, {useRef, useEffect, useState, useMemo} from "react"

import {inView, motion} from "framer-motion"
import {twMerge} from "tailwind-merge"
// import {useObserverContext} from "";
import {useScroll} from "framer-motion"
const ScrollText = ({
  text,
  ScrollMargin = 500,
  className,
  id,
}: {
  text?: string
  ScrollMargin?: number
  className?: string
  id?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [initialHeight, setInitialHeight] = useState<number | null>(null)
  //#region footer setting
  // const {setObserver} = useObserverContext();
  const [inView, setInview] = useState<boolean>(false)
  const [rectTop, setRectTop] = useState<number | null>()
  // const [ratio, setRatio] = useState<number>(0);
  const {scrollY, scrollYProgress} = useScroll({target: ref})
  const topY = scrollY.get()

  const ratio =
    initialHeight && topY
      ? ((topY - 200 - initialHeight) * 100) / ScrollMargin
      : null

  // console.log("ratio ", ratio)
  useEffect(() => {
    if (ref.current) {
      const callback = ref.current.addEventListener("scroll", () => {
        if (inView && ref.current) {
          const rect = ref.current.getBoundingClientRect().top
          const scrollTop = window.scrollY || document.documentElement.scrollTop
          setInitialHeight(rect + scrollTop)
        }
      })
    }
  }, [initialHeight, topY])
  // useEffect(() => {
  //   const callback: IntersectionObserverCallback = (entries) => {
  //     entries.forEach((ele) => {
  //       // console.log(ele);

  //       if (!ele && !ref.current) return;
  //       const calcTop = () => {
  //         const rect = ref.current?.getBoundingClientRect();
  //         const top = rect ? rect.top : 0;
  //         setRectTop(top);
  //       };

  //       if (ele.isIntersecting) {
  //         let height = ele.boundingClientRect.top;

  //         setInitialHeight(height);
  //         document.addEventListener("scroll", calcTop);
  //       } else {
  //         observer.unobserve(ele.target);
  //       }
  //     });
  //   };
  //   const observer = new IntersectionObserver(callback, {
  //     threshold: 1,
  //     rootMargin: "250px",
  //   });
  //   if (setObserver) setObserver(observer);
  //   // return () => {
  //   //   if (ref.current) observer.disconnect();
  //   // };
  // }, [initialHeight, topY]);

  // const setInitalHeight = () => {
  //   if (initialHeight && initialHeight > 0 && !inView) {
  //     setInview(true);
  //     if (typeof document !== undefined) {
  //       const scrollTop = window.scrollY || document.documentElement.scrollTop;
  //       if (ref.current)
  //         setInitialHeight(
  //           ref?.current?.getBoundingClientRect().top + scrollTop
  //         );
  //     }
  //   }
  // };
  return (
    <motion.div
      key={id}
      id={id}
      onViewportEnter={(entry) => {
        if (!inView) {
          setInview(true)
          if (entry?.boundingClientRect)
            setInitialHeight(entry?.boundingClientRect.top)
        }
      }}
      // onViewportLeave={() => setInview(false)}
      //   id={id}
      ref={ref}
      className={twMerge(
        `footer-text cursor-default select-none font-bold  text-white [&>*]:text-xl  [&>*]:leading-[1.5] [&>*]:md:text-4xl
       [&>*]:xl:text-[45px] [&>*]:xl:leading-[68px]  [&>*]:3xl:text-[46px] [&>*]:3xl:leading-[87px]  `,
        className,
        ratio && `scroll-${ratio > 0 ? Math.floor(Math.min(ratio, 100)) : 0}`
      )}
      dangerouslySetInnerHTML={{
        __html: text ? text : "",
      }}></motion.div>
  )
}

export default ScrollText
