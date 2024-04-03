import React, {PropsWithChildren, useEffect, useRef} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import clsx from "clsx";

const Parallax = ({
  id = "parallax",
  className,
  children,
  from = -15,
  to = 15,
  speed = 1,
  targetClass,
}: PropsWithChildren<{
  id?: string;
  from?: number;
  to?: number;
  className?: string;
  speed?: number;
  targetClass?: string;
}>) => {
  const trigger = useRef(null);
  const target = useRef(null);
  let timeline = useRef<any>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        id: id,
        trigger: trigger.current,
        scrub: 3,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: true,
        // markers: true,
        start: "top bottom",
        end: "bottom top",
      },
    });

    tl.fromTo(
      target.current,

      {yPercent: from},
      {yPercent: to}
    );
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className={className} ref={trigger}>
      <div
        id="parallax-target"
        className={clsx(`relative h-full w-full overflow-hidden `, targetClass)}
        ref={target}>
        {children}
      </div>
    </div>
  );
};

export default Parallax;
