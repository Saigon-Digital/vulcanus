import React, {
  Dispatch,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {CompanyHistoryBlock} from "@/__generated__/graphql";
import Image from "next/image";
import {
  Swiper,
  SwiperSlide,
  SwiperClass,
  useSwiper,
  SwiperRef,
} from "swiper/react";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {Mousewheel} from "swiper/modules";
import clsx from "clsx";
import {Maybe} from "graphql/jsutils/Maybe";

type Histories = NonNullable<CompanyHistoryBlock["histories"]>;

interface HistoryObject {
  [key: string]: Histories[number];
}

const CompanyHistory = (props: CompanyHistoryBlock) => {
  // Slider not work as expected, check logic again
  let sizes = props.histories ? props.histories.length : 0;
  function transformArray(arr: Histories): HistoryObject[] | null {
    if (!arr) return null;
    if (arr?.length === 0) return [];

    const result: Array<HistoryObject> = [];
    arr.forEach((el, i) => {
      const pre = i === 0 ? arr[0] : arr?.[i - 1];
      const current = arr[i];
      if (pre && current) {
        result.push({pre: pre, current: current});
      }
    });
    return result;
  }

  const imagePairs = props.histories && transformArray(props.histories);
  const [imgSlideHeight, setImgSlideHeight] = useState(0);

  const initialSlide = Math.floor(sizes / 2) + 1;

  const [currentSlide, setCurentSlide] = useState<number>(initialSlide);

  const swiperRef = useRef<SwiperRef | null>(null);

  const onSwiperChange = (swiper: SwiperClass) => {
    const slide = swiper.activeIndex;

    setCurentSlide(slide);
  };

  return (
    <div
      className={`history container-fluid rounded-xl bg-primary-midBlue-main px-5 py-14 lg:px-12 lg:py-20`}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-full md:col-span-4 lg:col-span-3">
          <h2 className="col-span-full text-4xl font-bold lg:text-5xl xl:text-[64px]">
            {props.title}
          </h2>

          <div className="relative col-span-2 mt-6 w-full gap-4 md:col-span-full md:w-fit md:flex-col md:justify-end lg:ml-auto ">
            <div className="w-full">
              <Swiper
                modules={[Mousewheel]}
                mousewheel={true}
                breakpoints={{
                  320: {
                    slidesPerView: 3,
                    direction: "horizontal",
                  },
                  640: {
                    slidesPerView: 5,
                  },
                  768: {
                    slidesPerView: 7,
                    direction: "vertical",
                  },
                }}
                ref={swiperRef}
                initialSlide={initialSlide}
                centeredSlides={true}
                onSlideChange={(swiper: any) => onSwiperChange(swiper)}
                slidesPerView={"auto"}>
                {props?.histories?.map((ele, id) => {
                  const distanceWithActive = currentSlide - id;
                  const isActive = id === currentSlide;
                  return (
                    <SwiperSlide
                      onClick={(e) => {
                        setCurentSlide(id);
                      }}
                      key={id}>
                      <SlideButton
                        distanceWithActive={distanceWithActive}
                        isActive={isActive}
                        id={id}>
                        {ele?.year}
                      </SlideButton>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
        <div
          className="relative col-span-full gap-4 transition-all duration-300 md:col-span-8 lg:col-start-5 xl:mt-16"
          style={{minHeight: `${imgSlideHeight}px`}}>
          {imagePairs?.map((pair, index) => {
            const isActive = currentSlide === index;
            return (
              <ImageSlide
                key={index}
                setImgSlideHeight={setImgSlideHeight}
                isActive={isActive}
                preUrl={pair?.pre?.mainImage?.node?.sourceUrl}
                currUrl={pair?.current?.mainImage?.node.sourceUrl}
                description={pair?.current?.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ImageSlide = (props: {
  isActive: boolean;
  preUrl?: Maybe<string>;
  currUrl?: Maybe<string>;
  description?: Maybe<string>;
  setImgSlideHeight: Dispatch<number>;
}) => {
  const {isActive, currUrl, description, preUrl, setImgSlideHeight} =
    props || {};
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      ref.current?.clientHeight && setImgSlideHeight(ref.current?.clientHeight);
    }

    window.addEventListener("resize", () => {
      if (isActive) {
        ref.current?.clientHeight &&
          setImgSlideHeight(ref.current?.clientHeight);
      }
    });

    return () =>
      window.removeEventListener("resize", () => {
        if (isActive) {
          ref.current?.clientHeight &&
            setImgSlideHeight(ref.current?.clientHeight);
        }
      });
  }, [isActive]);

  return (
    <div
      ref={ref}
      className={clsx(
        "absolute top-0 flex w-full flex-col gap-5 transition-opacity duration-500 xl:flex-row xl:items-start",
        isActive ? "z-10" : "opacity-0"
      )}>
      <div className="relative ml-auto aspect-[316/267] max-h-52 w-1/2 overflow-hidden rounded-md xl:max-h-none xl:w-full xl:flex-1">
        <Image
          className="object-cover"
          alt="history"
          fill
          src={preUrl || "/images/photo-1.png"}
        />
      </div>
      <div className="xl:flex-[2.92]">
        <div className="relative aspect-video  w-full overflow-hidden rounded-md ">
          <Image
            className="object-cover"
            alt="history"
            fill
            src={currUrl || "/images/hero-banner.png"}
          />
        </div>

        <div className="mt-5 font-light xl:text-xl">{description}</div>
      </div>
    </div>
  );
};

const SlideButton = (
  props: PropsWithChildren & {
    id: number;
    isActive: boolean;
    distanceWithActive: number;
  }
) => {
  const {id, isActive, distanceWithActive} = props || {};
  const swiper = useSwiper();

  const distance = Math.abs(distanceWithActive);

  const onClick = (e: any) => {
    swiper.slideTo(id);
  };

  return (
    <div
      className={clsx(
        `grid h-full place-items-center transition-all duration-300`,
        distance && "scale-75",
        distance === 1 && "opacity-50",
        distance === 2 && "opacity-30",
        distance === 3 && "opacity-10",
        distance > 3 && "opacity-0"
      )}>
      <button
        className={clsx(
          "block rounded-[5px] px-4 text-2xl text-[32px] leading-10 -tracking-wide transition-all duration-300 md:px-8 xl:text-3xl",
          isActive ? "bg-primary-blue-main py-2 font-bold" : "font-light"
        )}
        onClick={onClick}>
        <span className="inline-block translate-y-1">{props.children}</span>
      </button>
    </div>
  );
};

export default CompanyHistory;
