import type {ReactNode} from "react";
import Button from "../Button";
import dynamic from "next/dynamic";
// import {ArrowRight, ShapeLeftLarge} from "../Icons";
import Shape from "./images/shape.png";
import Image from "next/image";

import {getAcfLinkProps} from "@/utils";
import {TitleTextBlock_Fields} from "@/__generated__/graphql";

const ArrowRight = dynamic(() =>
  import("../Icons").then((mod) => mod.ArrowRight)
);

// import Button from "../Button";
type TProps = {
  extraGraphic?: ReactNode;
} & TitleTextBlock_Fields;

let contentData = {
  contentTitle:
    "At Vulcanus we are committed, to pushing the limits of innovation through our Research and Development (R&D) initiative. ",
  contentBody: [
    "We invest in groundbreaking technologies & innovative solutions to maintain our position as a leader, in CNC manufacturing. ",
    "Our dedicated R&D team works tirelessly to create state of the art processes guaranteeing that Vulcanus continues to excel in precision engineering.",
  ],
};
const HalfPageContent: React.FC<TProps> = ({
  title = "Research & Developement",
  content,
  haveShape,
  extraGraphic,
  cta,
}) => {
  return (
    <div className="relative">
      {haveShape && (
        <Image
          src={Shape}
          className="absolute left-0 top-1/2 -translate-y-1/2 "
          width={47}
          alt="shape"
          height={155}
        />
      )}
      <div className="container-fluid relative my-14">
        <div className="relative flex flex-wrap gap-y-10">
          {extraGraphic && extraGraphic}
          <div className="w-full md:w-1/2">
            {title && title?.length > 0 && (
              <h4 className="flex items-center gap-4 text-2xl font-bold leading-[33px]">
                <ArrowRight w={26} h={24} className="ml-2 inline-block" />

                {title}
              </h4>
            )}
          </div>
          <div className="w-full pl-10 md:w-1/2 md:pl-0">
            {content?.contents && (
              <>
                {content.contentTitle && (
                  <h4
                    dangerouslySetInnerHTML={{__html: content.contentTitle}}
                    className="[&>*>strong]:text-primary-blue-main [&>*]:text-2xl xl:[&>*]:text-3xl 2xl:[&>*]:text-[32px] 2xl:[&>*]:leading-[44px]"></h4>
                )}
                <div className="mt-6 flex flex-wrap justify-between xl:mt-8">
                  {content?.contents?.map((ele, id) => {
                    return (
                      ele &&
                      ele.text && (
                        <div
                          key={id}
                          dangerouslySetInnerHTML={{__html: ele?.text}}
                          className="w-full text-lg font-light md:w-[calc(50%-10px)] "></div>
                      )
                    );
                  })}
                  {cta && (
                    <Button className="mt-6" {...getAcfLinkProps(cta)}>
                      {cta.title}
                    </Button>
                  )}
                </div>
              </>
            )}
            {/* {cta && <Button link={cta.link}>{cta.text}</Button>} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalfPageContent;
