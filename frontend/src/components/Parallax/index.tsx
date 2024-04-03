import React, {PropsWithChildren, useEffect, useRef} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import clsx from "clsx";
import {useGSAP} from "@gsap/react";
const Parallax = ({
  id = "parallax",
  className,
  children,
  from = 0,
  to = 20,
  start = 0,
  speed = 1,
  targetClass,
}: PropsWithChildren<{
  id?: string;
  from?: number;
  to?: number;
  className?: string;
  start?: number;
  speed?: number;
  targetClass?: string;
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
          //   markers: true,
          start: `top+=${start}% top`,
          end: "bottom top",
        },
      });

      tl.to(
        target.current,

        {yPercent: to, ease: "none"}
      );
      return () => {
        tl.kill();
      };
    },
    {scope: trigger}
  );

  return (
    <div className={className} ref={trigger}>
      <div
        id="parallax-target"
        className={clsx(
          `relative h-full w-full  -translate-y-[15%] overflow-hidden `,
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
