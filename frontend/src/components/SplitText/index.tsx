import React, {PropsWithChildren, useRef} from "react";
import {m, MotionProps} from "framer-motion";
import {useConsoleLog} from "@/utils";

export function SplitText({children, ...rest}: PropsWithChildren<MotionProps>) {
  //@ts-ignore
  let words: string[] = children;

  //   return;
  const ref = useRef(null);
  return words.map((word, i) => {
    return (
      <div key={i} style={{display: "inline-block", overflow: "hidden"}}>
        <m.div
          {...rest}
          ref={ref}
          style={{display: "inline-block", willChange: "transform"}}
          custom={i}>
          {word + (i !== words.length - 1 ? "\u00A0" : "")}
        </m.div>
      </div>
    );
  });
}
