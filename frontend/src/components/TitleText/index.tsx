import React from "react";
import Shape from "./images/shape.svg";
import {motion} from "framer-motion";
type TText = {
  title?: string;
};
const index = ({
  title = "We are committed to innovation, quality, and meeting the evolving needs of our clients.",
}: TText) => {
  return (
    <section className="container-fluid relative  gap-4 py-14">
      <div className="relative grid grid-cols-12">
        <motion.h2
          initial={{y: 30, opacity: 0}}
          whileInView={{y: 0, opacity: 1}}
          transition={{duration: 0.5}}
          className="title-xl col-span-10 md:col-span-8 lg:col-span-7">
          {title}
        </motion.h2>
        <Shape className="absolute right-0 hidden aspect-square h-1/3 object-contain sm:top-1/2 sm:h-2/3 sm:-translate-y-1/2 md:block lg:h-full" />
      </div>
    </section>
  );
};

export default index;
