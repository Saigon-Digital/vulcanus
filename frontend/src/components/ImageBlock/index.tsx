import Image from "next/image";
import React from "react";
import {type ImageBlock} from "@/__generated__/graphql";
import Parallax from "../Parallax";

const ImageBlock: React.FC<
  ImageBlock & {
    imageSrc?: string;
    className?: string;
    height?: number;
    maxWidth?: boolean;
  }
> = (props) => {
  return (
    <div className={` container-fluid px-0 md:px-[20px] ${props.className} `}>
      <Parallax
        to={35}
        from={-10}
        style={{maxHeight: `${props.height}px`}}
        targetClass="min-h-[400px] md:min-h-[450px] lg:min-h-[656px] 2xl:min-h-[700px]"
        className="relative min-h-[300px] w-full overflow-hidden md:min-h-[400px] lg:min-h-[586px] 2xl:min-h-[689px]">
        {props.imageSrc ? (
          <Image
            fill
            src={props.imageSrc || "/images/image-large.png"}
            alt="image"
            className="object-cover "></Image>
        ) : (
          <Image
            fill
            src={props.image?.node?.sourceUrl || "/images/image-large.png"}
            alt="image"
            className="object-cover"
          />
        )}
      </Parallax>
    </div>
  );
};

ImageBlock.defaultProps = {
  maxWidth: true,
};

export default ImageBlock;
