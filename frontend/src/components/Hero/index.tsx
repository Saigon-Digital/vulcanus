import {HeroBlockFragment} from "@/__generated__/graphql"
import {getAcfLinkProps} from "@/utils"
import Image from "next/image"
import Button from "../Button"

import useImageStyle from "@/hooks/useImageCss"
import {useMediaQuery} from "@/hooks/useMediaQuery"
import useOrientation from "@/hooks/useOrientation"
import useWidth from "@/hooks/useWidth"
import {useRef} from "react"
import {useRatio} from "@/hooks/useRatio"

const Hero: React.FC<HeroBlockFragment> = (props) => {
  const isMobile = useMediaQuery("(max-width:1280px)")
  const ref = useRef<HTMLDivElement>(null)
  const imgStyle =
    useImageStyle({
      src: props.backgroundImage?.node.sourceUrl || "",
      fill: false,
      w: 1800,
      h: 900,
      priority: true,
    }) || ""

  const ratio = useRatio(props.backgroundImage?.node.sourceUrl || "")
  const orientation = useOrientation({isMobile: isMobile})

  const containerWidth = useWidth(ref)
  const isLandscape = isMobile && orientation === "landscape"
  return (
    <div ref={ref} className="sm:container-fluid">
      <div
        style={{
          width: isLandscape ? containerWidth : undefined,
          aspectRatio: isLandscape ? ratio : undefined,
        }}
        className=" relative flex min-h-[calc(100vh-var(--header-height)-2*var(--header-py))] items-center justify-center overflow-hidden rounded-[5px] py-10">
        {isMobile &&
          (orientation === "landscape" ? (
            containerWidth && (
              <Image
                style={{
                  width: containerWidth,
                  height: containerWidth * ratio,
                }}
                width={containerWidth}
                height={containerWidth * ratio}
                alt="hero image"
                src={props.backgroundImage?.node.sourceUrl || ""}
                className="hero image absolute inset-0 object-contain  object-top"
              />
            )
          ) : (
            <Image
              fill
              sizes="100vw"
              alt="hero image"
              src={props.backgroundImage?.node.sourceUrl || ""}
              className="hero image object-cover-photo"
            />
          ))}
        <div className="absolute inset-0 z-[5] h-full w-full bg-black/40"></div>
        <div className="absolute -top-[26px] left-0  z-10 hidden aspect-[100.528/278.4] md:block md:w-[80px] 3xl:-top-[28px] 3xl:w-[100px] ">
          <Image
            fill
            sizes="33vw"
            src="/shapes/hero-shape.png"
            alt="Hero Shape"
            className="object-contain object-center"
          />
        </div>
        {!isMobile && (
          <div
            style={{backgroundImage: imgStyle}}
            className="parallax absolute inset-0 h-full w-full"></div>
        )}

        <div className="w-full grow grid-cols-12 gap-x-6 lg:grid">
          <div className="relative z-10 mx-auto max-w-[85%] text-secondary-offWhite-white lg:col-span-full lg:col-start-2 lg:mx-0 lg:max-w-[868px]">
            {props.title && (
              <h1 className="2x:text-[64px] relative z-10 mb-3 break-words text-4xl font-extrabold uppercase leading-[140%] tracking-tight lg:text-5xl">
                {props?.title}
              </h1>
            )}
            {props.description && (
              <p className="font-normal leading-[140%] tracking-tight min-max-[18_32]">
                {props?.description}
              </p>
            )}
            {props?.button?.url && props?.button?.title ? (
              <Button className="mt-10" {...getAcfLinkProps(props?.button)}>
                {props?.button?.title}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
