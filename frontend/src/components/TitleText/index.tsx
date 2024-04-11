import React from "react";
import dynamic from "next/dynamic";
import LazyImport from "../LazyImport";
import {motion} from "framer-motion";
const Image = dynamic(() => import("next/image"));

type TText = {
  title?: string;
};
const index = ({
  title = "We are committed to innovation, quality, and meeting the evolving needs of our clients.",
}: TText) => {
  return (
    <section className="container-fluid relative  gap-4 py-14">
      <LazyImport>
        <div className="relative grid grid-cols-12">
          <motion.h2
            style={{y: "50px", opacity: 0}}
            whileInView={{y: 0, opacity: 1}}
            viewport={{margin: "40%"}}
            transition={{duration: 0.8, delay: 0.4}}
            className="title-xl col-span-10 md:col-span-8 lg:col-span-7">
            {title}
          </motion.h2>
          <Image
            height={233}
            width={210}
            alt="shape"
            src="/images/shape.svg"
            className="absolute right-0 hidden aspect-square h-1/3 object-contain sm:top-1/2 sm:h-2/3 sm:-translate-y-1/2 md:block lg:h-full"
          />
        </div>
      </LazyImport>
    </section>
  );
};

export default index;
