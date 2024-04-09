import React, {ReactNode, useEffect, useRef, useState} from "react";
import {TitleBlockFragment} from "@/__generated__/graphql";
import parse, {domToReact, Element, DOMNode} from "html-react-parser";
import {TitleShape} from "../Icons";
import {motion} from "framer-motion";
import clsx from "clsx";
import {SplitText} from "../SplitText";
const TitleBlock: React.FC<TitleBlockFragment> = ({
  title,
  haveShape,
  haveBorderBottom,
  textSize = ["large"],
}) => {
  const size = textSize?.find((_, id) => id === 0) || textSize || "large";
  const titleRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<any>([]);

  const renderSplitText = () => {
    return nodes.map(({innerHTML, children}: any) => {
      return (
        <motion.div>
          {innerHTML && innerHTML}
          {children}
        </motion.div>
      );
    });
  };

  useEffect(() => {
    console.log(titleRef.current?.children);
    setNodes(titleRef.current?.childNodes);
  }, []);
  return (
    <section className="container-fluid relative">
      <div
        className={`title-block   grid grid-cols-12 py-16 lg:py-20 ${
          haveBorderBottom && " border-b border-[#E6ECF3]"
        }`}>
        <motion.div
          initial={{y: "40%", opacity: 0}}
          whileInView={{y: 0, opacity: 1}}
          transition={{duration: 0.5}}
          ref={titleRef}
          className={clsx(
            "title col-span-full max-w-[1165px]  font-bold md:col-span-10 xl:text-5xl 3xl:col-span-8 [&>*]:text-4xl [&>*]:tracking-tight ",
            size === "large"
              ? "2xl:leading-[89px] 2xl:[&>*]:text-[64px] 2xl:[&>*]:leading-[89px]"
              : "2xl:leading-[67px] xl:[&>*]:text-5xl 2xl:[&>*]:leading-[67px]"
          )}
          dangerouslySetInnerHTML={{__html: title || ""}}></motion.div>
        {haveShape && (
          <TitleShape
            h={200}
            w={200}
            className="absolute -right-[10px] top-1/2 hidden -translate-y-1/2 lg:block"
          />
        )}
      </div>
    </section>
  );
};

export default TitleBlock;
