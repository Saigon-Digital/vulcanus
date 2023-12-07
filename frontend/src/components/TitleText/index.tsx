import React from "react";
import Shape from "./images/shape.svg";
type TText = {
  title?: string;
};
const index = ({
  title = "We are committed to innovation, quality, and meeting the evolving needs of our clients.",
}: TText) => {
  return (
    <section className="container relative  gap-4 py-14">
      <div className="relative grid grid-cols-12">
        <h2 className="title-xl col-span-10 md:col-span-8 lg:col-span-7">
          {title}
        </h2>
        <Shape className="absolute right-0 hidden aspect-square h-1/3 object-contain sm:top-1/2 sm:h-2/3 sm:-translate-y-1/2 md:block lg:h-full" />
      </div>
    </section>
  );
};

export default index;
