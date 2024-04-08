import Image from "next/image";
import React from "react";
import {type ImageBlock} from "@/__generated__/graphql";
import useImageStyle from "@/hooks/useImageCss";
import {useConsoleLog} from "@/utils";

const ImageBlock: React.FC<
  ImageBlock & {
    imageSrc?: string;
    className?: string;
    height?: number;
    maxWidth?: boolean;
  }
> = (props) => {
  const imageStyle = useImageStyle({
    src: props.image?.node.sourceUrl || "",
    w: 1820,
    h: 700,
    alt: props.image?.node.altText || "Image Block image",
  });
  useConsoleLog("Image Block", props.image);
  return (
    <div
      style={{backgroundImage: imageStyle}}
      className={` parallax container-fluid min-h-[400px] w-full px-0 md:min-h-[450px] md:px-[20px] lg:min-h-[656px] 2xl:min-h-[700px] ${props.className} `}></div>
  );
};

ImageBlock.defaultProps = {
  maxWidth: true,
};

export default ImageBlock;
