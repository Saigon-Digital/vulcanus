import React, {ReactNode} from "react";
import Button from "../Button";
type TProps = {
  title?: string;
  content?: {
    contentTitle?: string;
    contentBody?: string[];
  };
  extraGraphic?: ReactNode;
  cta?: {text?: string; link?: string};
};
let contentData = {
  contentTitle:
    "At Vulcanus we are committed, to pushing the limits of innovation through our Research and Development (R&D) initiative. ",
  contentBody: [
    "We invest in groundbreaking technologies & innovative solutions to maintain our position as a leader, in CNC manufacturing. ",
    "Our dedicated R&D team works tirelessly to create state of the art processes guaranteeing that Vulcanus continues to excel in precision engineering.",
  ],
};
const HalfPageCotent = ({
  title = "Research & Developement",
  content = contentData,
  extraGraphic,
  cta,
}: TProps) => {
  return (
    <div className="container my-14">
      <div className="relative flex flex-wrap">
        {extraGraphic && extraGraphic}
        <div className="w-full md:w-1/2">
          <h4 className="text-2xl font-bold">{title}</h4>
        </div>
        <div className="w-full md:w-1/2">
          {content && (
            <>
              <h4 className="text-2xl md:text-3xl">{content.contentTitle}</h4>
              <div className="mt-6 flex flex-wrap justify-between xl:mt-8">
                {content.contentBody?.map((ele, id) => {
                  return (
                    <p className="w-full text-lg font-light md:w-[calc(50%-20px)]">
                      {ele}
                    </p>
                  );
                })}
              </div>
            </>
          )}
          {cta && <Button link={cta.link}>{cta.text}</Button>}
        </div>
      </div>
    </div>
  );
};

export default HalfPageCotent;
