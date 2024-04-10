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
      // placeholder: "blur",
      // blurDataURL:
      //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAACjSURBVBhXHcpNC8FgAMDx/4O8rBS1HBTKjbgpVw6+jM+nfAEX4sJyELUaY83mvT1etodcf/3E2HypdEJxfoLhK+o5cIOInWUxNGyihEayUEUs7KeKx8Q/Ov6dyXSOeQlxUnm2P6yWK4T+ATEwLmo5G+Hd3oQZHfmS8AnwfImSJ0qa5O5YCL3WUw93TavTI6uXeRxWdNsNNkGRfvNK5r3ndLzyBV2qUIUDrZ3fAAAAAElFTkSuQmCC",
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
