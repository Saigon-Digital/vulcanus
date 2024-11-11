import Image from "next/image"

import {type ImageBlock} from "@/__generated__/graphql"
import useImageStyle from "@/hooks/useImageCss"
import {useMediaQuery} from "@/hooks/useMediaQuery"
import useOrientation from "@/hooks/useOrientation"
import {useRef} from "react"
import useWidthAndHeight from "@/hooks/useWidth"
import {useRatio} from "@/hooks/useRatio"
import ImageWithRatio from "../ImageWithRatio"

const ImageBlock: React.FC<
  ImageBlock & {
    imageSrc?: string
    className?: string
    height?: number
    maxWidth?: boolean
  }
> = (props) => {
  const imageStyle = useImageStyle({
    src: props.imageSrc || props.image?.node.sourceUrl || "",
    w: 1820,
    h: props.height,
    alt: props.image?.node.altText || "Image Block image",
  })
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width:1280px)")
  const orientation = useOrientation({isMobile})
  const ratio = useRatio(props.image?.node.sourceUrl || "")
  const containerD = useWidthAndHeight(ref)

  return isMobile ? (
    containerD && (
      <div
        ref={ref}
        className=" relative h-[300px] w-full overflow-hidden md:h-[350px] lg:h-[400px]">
        <div
          style={{
            width: containerD.w * 1.5,
            height: (containerD.w / ratio) * 1.5,
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ImageWithRatio
            width={containerD.w * 1.5}
            imageSrc={props.image?.node.sourceUrl}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    )
  ) : (
    <div
      style={{backgroundImage: imageStyle}}
      className={` parallax container-fluid aspect-[14/9] w-full px-0 sm:min-h-[400px] md:min-h-[450px] md:px-[20px] lg:min-h-[656px] xl:aspect-[1872/689] 2xl:min-h-[700px] ${props.className} `}></div>
  )
}

ImageBlock.defaultProps = {
  maxWidth: true,
  height: 700,
}

export default ImageBlock
