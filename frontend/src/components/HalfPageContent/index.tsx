import React, {ReactNode} from "react";
import Button from "../Button";
import {TitleTextBlock_Fields} from "@/__generated__/graphql";
import {ArrowRight, ShapeLeftLarge} from "../Icons";
import Shape from "./images/shape.png";
import Image from "next/image";
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

      <div className="container-fluid my-14">
        <div className="relative flex flex-wrap">
          {extraGraphic && extraGraphic}
          <div className="w-full md:w-1/2">
            {title && title?.length > 0 && (
              <h4 className="flex items-center gap-4 text-2xl font-bold leading-none">
                <ArrowRight w={26} h={24} className="ml-2 inline-block" />{" "}
                {title}
              </h4>
            )}
          </div>
          <div className="w-full md:w-1/2">
            {content?.contents && (
              <>
                <h4 className="text-2xl md:text-3xl">
                  {content?.descriptionTitle}
                </h4>
                <div className="mt-6 flex flex-wrap justify-between xl:mt-8">
                  {content?.contents?.map((ele, id) => {
                    return (
                      <p
                        key={id}
                        className="w-full text-lg font-light md:w-[calc(50%-20px)]">
                        {ele?.content as string}
                      </p>
                    );
                  })}
                  {cta && (
                    <Button
                      className="mt-6"
                      href={(cta?.link?.url as string) || ""}>
                      {cta.ctaText}
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
