import {RichTextFragment} from "@/__generated__/graphql";
import React from "react";
import {twMerge} from "tailwind-merge";

const RichText: React.FC<RichTextFragment> = (props) => {
  return (
    <section className="container-block richtext py-28 ">
      <div className="grid grid-cols-12 gap-y-10 px-5">
        <div
          className={twMerge(
            "content col-span-full flex flex-col ",

            "md:col-span-full md:col-start-3 lg:col-span-10 lg:col-start-2"
          )}>
          {props.richText && (
            <div dangerouslySetInnerHTML={{__html: props.richText}}></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RichText;
