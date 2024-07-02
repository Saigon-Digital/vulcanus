import dynamic from "next/dynamic";

import {motion} from "framer-motion";
const Image = dynamic(() => import("next/image"));

type TText = {
  title?: string;
};
const index = ({
  title = "We are committed to innovation, quality, and meeting the evolving needs of our clients.",
}: TText) => {
  return (
    <section className=" relative  gap-4 py-14">
      <div className="container-fluid">
        <div className="relative grid grid-cols-12">
          {title && (
            <h2 className="title-xl col-span-10 md:col-span-8 lg:col-span-7">
              {title}
            </h2>
          )}
        </div>
      </div>
      <Image
        height={233}
        width={210}
        alt="shape"
        src="/images/shape.svg"
        className="absolute right-0 hidden aspect-square h-1/3 object-contain sm:top-1/2 sm:h-2/3 sm:-translate-y-1/2 md:block lg:h-full"
      />
    </section>
  );
};

export default index;
