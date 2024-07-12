import {useRatio} from "@/hooks/useRatio"
import Image from "next/image"
import {useEffect, useState} from "react"
import {twMerge} from "tailwind-merge"

type Props = {
  imageSrc?: string | null | undefined
  className?: string
  height?: number
  width?: number
  delay?: number
}
const ImageWithRatio = ({
  imageSrc,
  height = 400,
  className,
  width,
  delay = 200,
}: Props) => {
  const ratio = useRatio(imageSrc || "")
  const w = ratio && height ? height * ratio : height

  const h = ratio && width ? width / ratio : width
  const [init, setInit] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setInit(true)
    }, delay ?? 200)
  }, [delay])

  if (!init) return null

  if (width)
    return (
      <Image
        width={width}
        height={h}
        priority
        style={{
          width: width || "auto",
          height: h || "auto",
          aspectRatio: ratio || "auto",
        }}
        className={twMerge("object-contain", className)}
        alt="image auto ratio"
        src={imageSrc || ""}
      />
    )
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
