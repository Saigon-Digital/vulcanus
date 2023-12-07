import Image from "next/image";
import React from "react";

const ImageBlock = () => {
  return (
    <div className="container-fluid">
      <div className="relative min-h-[60vh] lg:min-h-[80vh]">
        <Image
          fill
          src="/images/image-large.png"
          alt="image"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default ImageBlock;
