import React, {ReactNode} from "react";
import Button from "../Button";
import {TitleTextBlock_Fields} from "@/__generated__/graphql";

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
  extraGraphic,
  cta,
}) => {
  console.log(cta);

  return (
    <div className="container-fluid my-14">
      <div className="relative flex flex-wrap">
        {extraGraphic && extraGraphic}
        <div className="w-full md:w-1/2">
          <h4 className="text-2xl font-bold">{title}</h4>
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
                  <Button href={(cta?.link?.url as string) || ""}>
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
  );
};

export default HalfPageContent;
