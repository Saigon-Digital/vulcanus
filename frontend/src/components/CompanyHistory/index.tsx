import React, {
  Dispatch,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {CompanyHistoryBlock} from "@/__generated__/graphql"
import Image from "next/image"
import {
  Swiper,
  SwiperSlide,
  SwiperClass,
  useSwiper,
  SwiperRef,
} from "swiper/react"
import {useMediaQuery} from "@/hooks/useMediaQuery"
import {Mousewheel} from "swiper/modules"
import {twMerge} from "tailwind-merge"
import {Maybe} from "graphql/jsutils/Maybe"
// import {useLenis} from "lenis/react";
type Histories = NonNullable<CompanyHistoryBlock["histories"]>

interface HistoryObject {
  [key: string]: Histories[number]
}

const CompanyHistory = (props: CompanyHistoryBlock) => {
  // Slider not work as expected, check logic again
  let sizes = props.histories ? props.histories.length : 0
  // const lenis = useLenis();

  let sortedHistory = useMemo(() => {
    let temp = props.histories ? [...props.histories] : []
    temp = temp.sort((a, b) => (Number(a?.year) - Number(b?.year)) * -1)
    return temp
  }, [props.histories])

  function transformArray(arr: Histories): HistoryObject[] | null {
    if (!arr) return null
    if (arr?.length === 0) return []

    const result: Array<HistoryObject> = []
    arr.forEach((el, i) => {
      const pre = i === 0 ? arr[0] : arr?.[i - 1]
      const current = arr[i]
      if (pre && current) {
        result.push({pre: pre, current: current})
      }
    })
    return result
  }

  const imagePairs = sortedHistory && transformArray(sortedHistory)

  const initialSlide = 0

  const [currentSlide, setCurentSlide] = useState<number>(initialSlide)

  const swiperRef = useRef<SwiperRef | null>(null)

  const onSwiperChange = (swiper: SwiperClass) => {
    const slide = swiper.activeIndex

    setCurentSlide(slide)
  }

  return (
    <div
      className={`history container-fluid rounded-xl bg-primary-midBlue-main px-5 py-14  pb-80 sm:pb-60 lg:px-12 lg:py-20 xl:pb-[200px] 3xl:pb-60`}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-full md:col-span-4 xl:col-span-3">
          <h2 className="col-span-full text-3xl font-bold lg:text-5xl xl:text-[64px]">
            {props.title}
          </h2>

          <div className="relative col-span-2 mx-auto mt-6 w-full items-center justify-center gap-4 md:col-span-full md:w-fit md:flex-col xl:ml-auto xl:justify-end ">
            <div className="w-full">
              <Swiper
                modules={[Mousewheel]}
                mousewheel={true}
                speed={150}
                breakpoints={{
                  320: {
                    slidesPerView: 3,
                    direction: "horizontal",
                  },
                  640: {
                    slidesPerView: 5,
                    direction: "horizontal",
                  },
                  768: {
                    slidesPerView: 7,
                    direction: "vertical",
                  },
                }}
                ref={swiperRef}
                initialSlide={initialSlide}
                centeredSlides={true}
                onSlideChange={(swiper: any) => {
                  onSwiperChange(swiper)
                }}
                // onTransitionEnd={() => lenis?.start()}
                // onSlideNextTransitionEnd={() => }

                slidesPerView={"auto"}>
                {sortedHistory.map((ele, id) => {
                  const distanceWithActive = currentSlide - id
                  const isActive = id === currentSlide
                  return (
                    <SwiperSlide
                      onClick={(e) => {
                        setCurentSlide(id)
                      }}
                      key={id}>
                      <SlideButton
                        distanceWithActive={distanceWithActive}
                        isActive={isActive}
                        id={id}>
                        {ele?.year}
                      </SlideButton>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="relative col-span-full gap-4 transition-all duration-150 md:col-span-10 lg:col-start-5 xl:mt-10">
          {/* To make the placeholder */}
          <div className="pointer-events-none invisible flex overflow-hidden">
            {imagePairs?.map((pair, index) => {
              return (
                <SlidePlaceHolder
                  key={index}
                  description={pair?.current?.description}
                />
              )
            })}
          </div>

          {imagePairs?.map((pair, index) => {
            const isActive = currentSlide === index
            return (
              <ImageSlide
                key={index}
                isActive={isActive}
                preUrl={pair?.pre?.mainImage?.node?.sourceUrl}
                currUrl={pair?.current?.mainImage?.node.sourceUrl}
                description={pair?.current?.description}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

const ImageSlide = (props: {
  isActive: boolean
  preUrl?: Maybe<string>
  currUrl?: Maybe<string>
  description?: Maybe<string>
}) => {
  const {isActive, currUrl, description, preUrl} = props || {}

  return (
    <div
      className={twMerge(
        "absolute top-0 flex w-full flex-col gap-3 transition-opacity duration-500 ",
        isActive ? "z-10" : "opacity-0"
      )}>
      <div className="relative order-2  max-h-52  w-full overflow-visible rounded-md xl:max-h-none  xl:w-[88%] ">
        {description && (
          <div
            className="rich-text mt-5  font-light xl:text-xl [&>*>p]:mt-3 [&>*>p]:text-xl [&>*>span]:mt-2 [&>*>span]:text-xl [&>*>strong]:text-2xl xl:[&>*>strong]:text-3xl  "
            dangerouslySetInnerHTML={{__html: description}}></div>
        )}
      </div>
      <div className="aspect-[16/10] overflow-hidden xl:w-3/5">
        <div className="relative aspect-[16/10]  w-full overflow-hidden rounded-md ">
          <Image
            className="object-cover object-top"
            alt="history"
            fill
            loading="eager"
            src={currUrl || "/images/hero-banner.png"}
          />
        </div>

        {/* <div className="mt-5 font-light xl:text-xl">{description}</div> */}
      </div>
    </div>
  )
}

const SlidePlaceHolder = ({
  description,
}: {
  description?: Maybe<TrustedHTML>
}) => {
  return (
    <div
      className={twMerge(
        "flex w-full shrink-0 flex-col gap-5 xl:flex-row xl:items-start"
      )}>
      <div className="relative ml-auto aspect-[316/267] max-h-52 w-1/2 overflow-hidden rounded-md xl:max-h-none xl:w-full xl:flex-1"></div>
      <div className="xl:flex-[2.92]">
        <div className="aspect-video w-full"></div>

        {/* {description && (
          <div
            className="mt-5 font-light xl:text-xl"
            dangerouslySetInnerHTML={{__html: description}}></div>
        )} */}
      </div>
    </div>
  )
}

const SlideButton = (
  props: PropsWithChildren & {
    id: number
    isActive: boolean
    distanceWithActive: number
  }
) => {
  const {id, isActive, distanceWithActive} = props || {}
  const swiper = useSwiper()

  const distance = Math.abs(distanceWithActive)

  const onClick = (e: any) => {
    swiper.slideTo(id)
  }

  return (
    <div
      className={twMerge(
        `grid h-full place-items-center transition-all duration-300`,
        distance && "scale-75",
        distance === 1 && "opacity-50",
        distance === 2 && "opacity-30",
        distance === 3 && "opacity-10",
        distance > 3 && "opacity-0"
      )}>
      <button
        className={twMerge(
          "block rounded-[5px] px-4 text-2xl text-[32px] leading-10 -tracking-wide transition-all duration-300 md:px-8 xl:text-3xl",
          isActive ? "bg-primary-blue-main py-2 font-bold" : "font-light"
        )}
        onClick={onClick}>
        <span className="inline-block translate-y-1">{props.children}</span>
      </button>
    </div>
  )
}

export default CompanyHistory
