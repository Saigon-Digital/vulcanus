import {PageBannerFragment} from "@/__generated__/graphql"
import useImageStyle from "@/hooks/useImageCss"
import {useMediaQuery} from "@/hooks/useMediaQuery"
import Image from "next/image"
import {useEffect, useMemo, useRef, useState} from "react"
import ReactPlayer from "react-player"
import ImageWithRatio from "../ImageWithRatio"
import useOrientation from "@/hooks/useOrientation"
import useWidth from "@/hooks/useWidth"

const PageBanner: React.FC<PageBannerFragment> = ({
  title,
  description,
  image,
  videoLink,
  videoOrImage,
}) => {
  const isMobile = useMediaQuery("(max-width:1280px)")
  const ref = useRef<HTMLDivElement>(null)

  const [isReady, setIsReady] = useState<boolean>(false)

  const imageStyle = useImageStyle({
    src: image?.node.sourceUrl || "",
    w: 1800,

    h: 900,

    alt: image?.node.altText || "page banner",
  })

  const orientation = useOrientation({isMobile: isMobile})

  const containerWidth = useWidth(ref)
  useEffect(() => {
    if (!isReady) setIsReady(true)
  }, [])
  return (
    <div ref={ref} className="container-fluid pb-10 lg:pb-16">
      <div className="flex flex-wrap items-center justify-between gap-y-5 py-10 ">
        {title && (
          <h1 className="text-4xl font-bold text-white lg:text-5xl 2xl:text-[64px] 2xl:leading-[89px]">
            {title}
          </h1>
        )}
        {description && (
          <div
            dangerouslySetInnerHTML={{__html: description}}
            className="w-full text-lg font-light md:w-1/2 md:text-xl [&>*>strong]:font-bold xl:[&>*]:text-xl"></div>
        )}
      </div>
      {videoOrImage?.at(0) === "video"
        ? isReady && (
            <div className=" relative mx-auto flex aspect-[375/186] min-h-[200px] w-full max-w-[1200px] items-center justify-center object-cover sm:min-h-[300px] lg:aspect-[2/1]  xl:w-full">
              <ReactPlayer
                width="100%"
                height="auto"
                controls
                config={{
                  vimeo: {
                    playerOptions: {
                      autoplay: false,
                      loop: true,
                      controls: true,
                      vimeo_logo: false,
                      play_button_position: "center",
                    },
                  },
                }}
                style={{
                  width: "110%",
                  background: "transparent",
                  aspectRatio: "374/186",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
                className="relative z-20 max-w-[100%]  -translate-x-3 overflow-hidden rounded-md "
                url={videoLink?.url || ""}
              />
            </div>
          )
        : image &&
          (!isMobile ? (
            <div
              style={{
                background: imageStyle,
                backgroundSize: "cover",
              }}
              className="relative aspect-[4/3] max-h-[600px] w-full object-cover lg:aspect-[2/1] xl:aspect-[1800/850]"></div>
          ) : // <ImageWithRatio
          //   imageSrc={image.node.sourceUrl}
          //   width={width}
          //   className=""
          // />

          // landscape

          orientation === "landscape" ? (
            containerWidth && (
              <div
                // style={{width: containerWidth, height: containerWidth / 1.8}}
                className=" relative   max-h-none w-full object-cover   lg:aspect-[1.8/1] lg:h-auto xl:aspect-[1800/850]">
                <ImageWithRatio
                  alt={image.node.altText}
                  width={containerWidth.w}
                  imageSrc={image?.node.sourceUrl || ""}
                  className="hero image   object-cover"
                />
              </div>
            )
          ) : (
            <div className=" relative aspect-[4/3] max-h-[600px] w-full object-cover md:h-[450px] lg:aspect-[2/1] lg:h-auto xl:aspect-[1800/850]">
              <Image
                fill
                sizes="100vw"
                priority
                alt={image.node.altText || "banner image"}
                className="object-cover-photo"
                src={image.node.sourceUrl || ""}
              />
            </div>
          ))}
    </div>
  )
}

export default PageBanner
