import Image from "next/image";
import React from "react";
import {type ImageBlock} from "@/__generated__/graphql";

const ImageBlock: React.FC<
  ImageBlock & {imageSrc?: string; className?: string; height?: number}
> = (props) => {
  return (
    <div className={`container-fluid ${props.className}`}>
      <div
        style={{maxHeight: `${props.height}px`}}
        className="relative min-h-[400px] lg:min-h-[586px]">
        {props.imageSrc ? (
          <Image
            fill
            src={props.imageSrc || "/images/image-large.png"}
            alt="image"
            className="object-cover"></Image>
        ) : (
          <Image
            fill
            src={props.image?.node?.sourceUrl || "/images/image-large.png"}
            alt="image"
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default ImageBlock;
