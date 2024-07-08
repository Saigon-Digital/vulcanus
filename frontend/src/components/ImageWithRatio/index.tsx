import {useRatio} from "@/hooks/useRatio"
import Image from "next/image"
import {twMerge} from "tailwind-merge"

type Props = {
  imageSrc?: string | null | undefined
  className?: string
  height?: number
  width?: number
}
const ImageWithRatio = ({imageSrc, height = 400, className, width}: Props) => {
  const ratio = useRatio(imageSrc || "")
  const w = ratio && height ? height * ratio : height

  return (
    <Image
      width={w}
      height={height}
      priority
      style={{
        height: height || "auto",
        width: width || "auto",
        aspectRatio: ratio || "auto",
      }}
      className={twMerge("object-contain", className)}
      alt="image auto ratio"
      src={imageSrc || ""}
    />
  )
}

export default ImageWithRatio
