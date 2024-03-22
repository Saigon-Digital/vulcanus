import {IconsBlock} from "@/__generated__/graphql";
import React from "react";
import Image from "next/image";
import Button from "../Button";
const index: React.FC<IconsBlock> = (props) => {
  return (
    <div className="container-fluid py-16 lg:py-20 xl:py-28 ">
      <div className="grid grid-cols-12 gap-y-10">
        <div className="col-span-full flex flex-col gap-4 sm:col-span-8 md:col-span-5 2xl:col-span-5">
          <p className="text-xl font-semibold text-primary-blue-main lg:text-2xl ">
            {props.preHeader}
          </p>
          <h2 className="text-3xl font-bold lg:text-5xl lg:leading-[67px]">
            {props.header}
          </h2>
          <p className="lg:text-lg 2xl:text-[20px]">{props.description}</p>
          <Button
            className="mt-5 max-w-[250px]"
            href={props.ctaLink?.ctaLink?.nodes[0].uri || ""}>
            {props.ctaLink?.ctaText}
          </Button>
        </div>
        <div className="col-span-full grid grid-cols-1 gap-y-10 sm:col-span-8 sm:grid-cols-2 md:col-span-7 lg:col-span-6 2xl:col-start-7">
          {props.icons?.map((ele, index) => {
            return (
              <div key={index} className="flex w-full flex-col gap-4 sm:w-4/5">
                <Image
                  width={80}
                  height={80}
                  src={ele?.iconImage?.node.sourceUrl || ""}
                  alt="icon"
                  className=""
                />
                <h5 className="text-2xl font-semibold">{ele?.iconTitle}</h5>
                <p className="text-lg font-[300]">{ele?.iconDescription}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default index;
