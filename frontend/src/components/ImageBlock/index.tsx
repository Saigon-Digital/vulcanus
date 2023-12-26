import Image from "next/image";
import React from "react";
import {type ImageBlock} from "@/__generated__/graphql";
const ImageBlock: React.FC<ImageBlock> = (props) => {
  return (
    <div className="container-fluid">
      <div className="relative min-h-[400px] lg:min-h-[686px]">
        <Image
          fill
          src={props.image?.node?.sourceUrl || "/images/image-large.png"}
          alt="image"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default ImageBlock;
