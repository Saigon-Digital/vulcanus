import {useRatio} from "@/hooks/useRatio";
import Image from "next/image";

type Props = {
  imageSrc?: string | null | undefined;
  className?: string;
  height: number;
};
const ImageWithRatio = ({imageSrc, height = 480, className}: Props) => {
  const ratio = useRatio(imageSrc || "");
  const w = ratio ? height * ratio : height;

  return (
    <Image
      width={w}
      height={height}
      className={className}
      alt="image auto ratio"
      src={imageSrc || ""}
    />
  );
};

export default ImageWithRatio;
