import {IconsBlock} from "@/__generated__/graphql";
import React from "react";
import Button from "../Button";
const index: React.FC<IconsBlock> = (props) => {
  return (
    <div className="container-fluid py-16 lg:py-20 xl:py-28 ">
      <div className="grid grid-cols-12">
        <div className="col-span-8 flex flex-col gap-4 md:col-span-5 2xl:col-span-4">
          <p className="text-xl font-semibold text-primary-blue-main lg:text-2xl ">
            {props.preHeader}
          </p>
          <h2 className="heading-2">{props.header}</h2>
          <p className="">{props.description}</p>
          <Button
            as="link"
            className="mt-5 max-w-[250px]"
            href={props.ctaLink?.ctaLink?.nodes[0].uri || ""}>
            {props.ctaLink?.ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default index;
