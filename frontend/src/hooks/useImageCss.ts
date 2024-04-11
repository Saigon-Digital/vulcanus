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
  loading,
  priority = false,
  size,
  fill = false,
}: {
  w?: number;
  h?: number;
  src: string;
  alt?: string;
  priority?: boolean;
  size?: string;
  fill?: boolean;
  loading?: "eager" | "lazy";
}) {
  const [imageStyle, setImageStyle] = useState("");
  const getImageStyle = () => {
    const {
      props: {srcSet},
    } = getImageProps({
      alt: alt || "",
      width: w,
      height: h,
      priority: priority,
      src: src,
      loading: loading,
      // placeholder: "blur",
      // blurDataURL:
      //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAACjSURBVBhXHcpNC8FgAMDx/4O8rBS1HBTKjbgpVw6+jM+nfAEX4sJyELUaY83mvT1etodcf/3E2HypdEJxfoLhK+o5cIOInWUxNGyihEayUEUs7KeKx8Q/Ov6dyXSOeQlxUnm2P6yWK4T+ATEwLmo5G+Hd3oQZHfmS8AnwfImSJ0qa5O5YCL3WUw93TavTI6uXeRxWdNsNNkGRfvNK5r3ndLzyBV2qUIUDrZ3fAAAAAElFTkSuQmCC",
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
