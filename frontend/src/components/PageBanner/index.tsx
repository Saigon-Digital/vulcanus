import React from "react";
import {PageBannerFragment} from "@/__generated__/graphql";
import parse from "html-react-parser";

import useImageStyle from "@/hooks/useImageCss";
const PageBanner: React.FC<PageBannerFragment> = ({
  title,
  description,
  image,
}) => {
  const imageStyle = useImageStyle({
    src: image?.node.sourceUrl || "",
    w: 1820,
    h: 900,
    alt: "page banner",
  });
  return (
    <div className="container-fluid pb-10 lg:pb-16">
      <div className="flex flex-wrap items-center justify-between gap-y-5 py-10 ">
        {title && (
          <h1 className="text-4xl font-bold text-white lg:text-5xl 2xl:text-[64px] 2xl:leading-[89px]">
            {title}
          </h1>
        )}
        {description && (
          <div className="w-full text-lg font-[300] md:w-1/2 md:text-xl [&>*>strong]:font-medium xl:[&>*]:text-xl">
            {description && parse(description)}
          </div>
        )}
      </div>
      {image && (
        <div
          style={{
            backgroundImage: imageStyle,
          }}
          className="parallax relative aspect-[2/1] max-h-[600px] w-full object-cover lg:aspect-[1800/850]">
          {/* <Parallax
            from={-10}
            to={40}
            className="absolute h-full w-full overflow-hidden "
            targetClass="h-[110%]">
            <Image
              fill
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAABYkAAAWJAW1onfoAAACrSURBVDhPY+RhMPjPQEXABKWpBoaggSysLAysQMzOwcbAyMjIwMzMDMZMTExgGiTHxsYK5oMwOsCIFDMLPQZLGwOGb99+MGzffIjBxsGY4d/ffwwcHOxAy5gZHj96wSAoyMfAwcnO8O7tR4YtG/ZDdUIAhoHcPFwMikoyDP///2O4ffMhg5AwP9il////Z2AEuQrI/vXrNwMLCzPDz5+/wIYig9FkQylgYAAApEMpfsabUyMAAAAASUVORK5CYII="
              src={image?.node?.sourceUrl || ""}
              alt="banner img"
              className="object-cover"
            />
          </Parallax> */}
        </div>
      )}
    </div>
  );
};

export default PageBanner;
