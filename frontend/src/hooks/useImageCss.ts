import {getImageProps} from "next/image";
import {useEffect, useState} from "react";

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}

function useImageStyle({
  w,
  h,
  src,
  alt,
  size,
  fill = false,
}: {
  w?: number;
  h?: number;
  src: string;
  alt?: string;
  size?: string;
  fill?: boolean;
}) {
  const [imageStyle, setImageStyle] = useState("");
  const getImageStyle = () => {
    const {
      props: {srcSet},
    } = getImageProps({
      alt: alt || "",
      width: w,
      height: h,
      src: src,

      objectFit: "cover",
    });
    const bgImageStyle = getBackgroundImage(srcSet);
    setImageStyle(bgImageStyle);
  };
  useEffect(() => {
    getImageStyle();
  }, []);

  return imageStyle !== "" ? imageStyle : "";
}

export default useImageStyle;
