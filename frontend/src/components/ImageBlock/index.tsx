import Image from "next/image";

import {type ImageBlock} from "@/__generated__/graphql";
import useImageStyle from "@/hooks/useImageCss";

const ImageBlock: React.FC<
  ImageBlock & {
    imageSrc?: string;
    className?: string;
    height?: number;
    maxWidth?: boolean;
  }
> = (props) => {
  const imageStyle = useImageStyle({
    src: props.imageSrc || props.image?.node.sourceUrl || "",
    w: 1820,
    h: props.height,
    alt: props.image?.node.altText || "Image Block image",
  });

  return (
    <div
      style={{backgroundImage: imageStyle}}
      className={` parallax container-fluid aspect-[14/9] w-full px-0 sm:min-h-[400px] md:min-h-[450px] md:px-[20px] lg:min-h-[656px] xl:aspect-[1872/689] 2xl:min-h-[700px] ${props.className} `}></div>
  );
};

ImageBlock.defaultProps = {
  maxWidth: true,
  height: 700,
};

export default ImageBlock;
