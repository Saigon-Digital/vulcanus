import {IconsBlock} from "@/__generated__/graphql";
import React from "react";
import Image from "next/image";
import Button from "../Button";
const index: React.FC<IconsBlock> = (props) => {
  return (
    <div className="container-fluid py-16 lg:py-20 xl:py-28 ">
      <div className="grid grid-cols-12">
        <div className="col-span-8 flex flex-col gap-4 md:col-span-5 2xl:col-span-5">
          {props.preHeader && (
            <p className="text-xl font-semibold text-primary-blue-main lg:text-2xl ">
              {props.preHeader}
            </p>
          )}
          {props.header && (
            <h2 className="text-3xl font-bold lg:text-5xl lg:leading-[67px]">
              {props.header}
            </h2>
          )}
          {props.description && (
            <p className="lg:text-lg">{props.description}</p>
          )}
          {props.ctaLink && (
            <Button
              className="mt-5 max-w-[250px]"
              href={props.ctaLink?.ctaLink?.nodes[0].uri || ""}>
              {props.ctaLink?.ctaText}
            </Button>
          )}
        </div>
        <div className="col-span-8 grid grid-cols-2 gap-y-10 md:col-span-7 lg:col-span-6 2xl:col-start-7">
          {props.icons &&
            props.icons?.map((ele, index) => {
              return (
                <div key={index} className="flex w-4/5 flex-col gap-4">
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
