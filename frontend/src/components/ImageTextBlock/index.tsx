import {ImageTextBlock} from "@/__generated__/graphql";

import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));

const ImageText: React.FC<ImageTextBlock> = ({
  textRepeater,
  rightImage,
  leftImage,
}) => {
  return (
    <div className="container py-20">
      <div className="grid grid-cols-4 gap-x-5 gap-y-10">
        <p className="col-span-full font-[300] md:col-span-2 md:col-start-3  lg:text-xl">
          {textRepeater && textRepeater[0]?.text}
        </p>
        <div className="relative col-span-full h-[360px] md:col-span-2 lg:col-span-1 ">
          <Image
            src={leftImage?.node?.sourceUrl || ""}
            fill
            sizes="(max-width: 768px) 80vw, (max-width: 800px) 40vw"
            alt="left image"
            className="object-cover"
          />
        </div>
        <div className="relative col-span-full h-[360px]  md:col-span-2 md:col-start-3 ">
          <Image
            src={rightImage?.node?.sourceUrl || ""}
            fill
            sizes="(max-width: 768px) 80vw, (max-width: 800px) 40vw"
            className="object-cover"
            alt="left image"
          />
        </div>
        <div className="col-span-full grid grid-cols-1 gap-5 sm:grid-cols-2 md:col-span-2 md:col-start-3">
          {textRepeater &&
            textRepeater.slice(1, textRepeater.length).map((ele, id) => {
              return (
                <p
                  className=" font-[300] lg:text-lg lg:leading-[25px]"
                  key={id}>
                  {ele?.text}
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ImageText;
