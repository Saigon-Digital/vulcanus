import React, {PropsWithChildren, useEffect, useRef} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import clsx from "clsx";
import {useGSAP} from "@gsap/react";
import {twMerge} from "tailwind-merge";
const Parallax = ({
  id = "parallax",
  className,
  children,
  from = -10,
  to = 50,
  start = -15,
  speed = 1,
  targetClass,
  style,
}: PropsWithChildren<{
  id?: string;
  from?: number;
  to?: number;
  className?: string;
  start?: number;
  speed?: number;
  targetClass?: string;
  style?: any;
}>) => {
  const trigger = useRef(null);
  const target = useRef(null);
  let timeline = useRef<any>(null);
  let initialClass = from < 0 && `-translate-y-[${Math.abs(from)}%]`;
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const tl = gsap.timeline({
        scrollTrigger: {
          id: id,
          trigger: trigger.current,
          scrub: 1,

          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
          // markers: true,
          start: `top+=${start}% top`,
          end: "bottom top",
        },
      });

      tl.fromTo(target.current, {yPercent: from}, {yPercent: to, ease: "none"});
      return () => {
        tl.kill();
      };
    },
    {scope: trigger}
  );

  return (
    <div style={style} className={className} ref={trigger}>
      <div
        id="parallax-target"
        className={twMerge(
          `relative h-full w-full   overflow-hidden `,
          initialClass,

          targetClass
        )}
        ref={target}>
        {children}
      </div>
    </div>
  );
};

export default Parallax;
