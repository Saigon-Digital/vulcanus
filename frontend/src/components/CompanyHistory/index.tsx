import React, {
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
import {Pagination} from "swiper/modules";
import clsx from "clsx";

// import Draggable from "react-draggable";

// import "./index.scss";
const CompanyHistory = (props: CompanyHistoryBlock) => {
  // Slider not work as expected, check logic again
  const isMobile = useMediaQuery("(max-width:768px)");
  let sizes = props.histories ? props.histories.length : 0;
  const activeSlide = !isMobile
    ? sizes > 5
      ? 2
      : Math.floor(sizes / 2) - 1
    : 0;

  const [currentSlide, setCurentSlide] = useState<number | undefined>(
    activeSlide
  );
  let histories = props.histories ? [...props.histories] : [];

  // return;
  histories.sort((a, b) => (a?.year && b?.year ? a?.year - b?.year : -1));

  const [mobileSlide, setMobileSlide] =
    useState<typeof props.histories>(histories);

  const swiperRef = useRef<SwiperRef | null>(null);

  const onSwiperChange = (swiper: SwiperClass) => {
    const slide = swiper.activeIndex;

    setCurentSlide(slide);
  };

  const activeHistory = useMemo(() => {
    if (isMobile) {
      return mobileSlide?.at(0);
    }
    return histories && histories.find((ele, id) => id === currentSlide);
  }, [currentSlide, mobileSlide]);

  const prevHistory = useMemo(() => {
    if (isMobile) return mobileSlide?.at(0);
    if (currentSlide && currentSlide - 1 > 0) {
      return histories && histories.find((ele, id) => id === currentSlide - 1);
    } else {
      return histories && histories.find((ele, id) => id === currentSlide);
    }
  }, [currentSlide]);

  const onMobileSlide = (index: number) => {
    let result = mobileSlide ? [...mobileSlide] : [];

    let rightItems = result.filter((ele, id) => id < index);
    let leftItem = result.filter((ele, id) => id >= index);

    result = [...leftItem, ...rightItems];

    setMobileSlide(result);
  };
  // console.log(mobileSlide);

  return (
    <div
      className={`history container-fluid rounded-xl bg-primary-midBlue-main px-5 py-14 lg:px-12 lg:py-20`}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-full grid grid-cols-6 md:col-span-4 md:mt-0 lg:col-span-3">
          <h2 className="col-span-full text-4xl font-bold lg:text-5xl xl:text-[64px]">
            {props.title}
          </h2>

          <div className="relative col-span-2  mt-10  flex  w-[65px] gap-4 after:absolute after:top-0 after:h-14 after:w-full after:rounded-md after:bg-primary-blue-main sm:h-[360px] md:col-span-full md:w-[134px] md:flex-col md:justify-end after:md:top-1/2 after:md:-translate-y-1/2 lg:ml-auto ">
            <div className="z-10 flex w-full flex-col items-center justify-start md:hidden">
              {mobileSlide?.map((ele, id) => {
                return (
                  <div
                    key={id}
                    onClick={() => onMobileSlide(id)}
                    className="flex h-14 w-full items-center justify-center">
                    {ele?.year}
                  </div>
                );
              })}
            </div>

            <div className=" hidden w-full md:block">
              <Swiper
                modules={[Pagination]}
                grabCursor={true}
                direction="vertical"
                // draggable
                // freeMode
                className="h-[300%] sm:h-full"
                // simulateTouch
                ref={swiperRef}
                initialSlide={activeSlide}
                centeredSlides={!isMobile}
                onSlideChange={(swiper: any) => onSwiperChange(swiper)}
                slidesPerView={isMobile ? 4 : 5}>
                {histories?.map((ele, id) => {
                  return (
                    <SwiperSlide
                      onClick={(e) => {
                        if (isMobile) setCurentSlide(id);
                      }}
                      // onClickCapture={}

                      className={clsx(
                        ` !flex items-center justify-center text-right text-xl  xl:text-3xl `,
                        activeSlide === id && "slide-active",
                        currentSlide &&
                          id === currentSlide - 2 &&
                          "!hidden opacity-40 sm:!block xl:text-[24px]",
                        currentSlide &&
                          id === currentSlide - 1 &&
                          "!hidden opacity-80 sm:!block",
                        currentSlide &&
                          id === currentSlide + 2 &&
                          "opacity-40 xl:text-[24px]",
                        currentSlide && id === currentSlide + 1 && "opacity-80 "
                      )}
                      key={id}>
                      <SlideButton isMobile={isMobile} id={id}>
                        {ele?.year}
                      </SlideButton>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <div className="col-span-4 mt-10 md:hidden">
            <Image
              className="aspect-video w-full rounded-md object-cover"
              alt="history"
              width={920}
              height={540}
              src={
                activeHistory?.mainImage?.node.sourceUrl ||
                "/images/hero-banner.png"
              }
            />
            <div className="mt-5">{activeHistory?.description}</div>
          </div>
        </div>
        <div className="col-span-full hidden grid-cols-12 gap-4 md:col-span-8 md:grid md:gap-5 lg:col-start-5">
          <div className="col-span-3">
            <Image
              className="ml-auto aspect-[316/267] rounded-md object-cover transition-all lg:w-3/4"
              alt="history"
              width={360}
              height={267}
              loading="eager"
              src={
                prevHistory?.mainImage?.node?.sourceUrl || "/images/photo-1.png"
              }
            />
          </div>
          <div className="col-span-9 max-w-[903px]">
            <Image
              className="aspect-video w-full rounded-md object-cover"
              alt="history"
              width={920}
              height={540}
              loading="eager"
              src={
                activeHistory?.mainImage?.node.sourceUrl ||
                "/images/hero-banner.png"
              }
            />
            <div className="mt-5 font-light xl:text-xl">
              {activeHistory?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SlideButton = (
  props: PropsWithChildren & {id: number; isMobile: boolean}
) => {
  const swiper = useSwiper();

  const onClick = (e: any) => {
    // if (props.isMobile) return;
    console.log("click", props.id, swiper.activeIndex);

    swiper.slideTo(props.id);
  };
  return (
    <button className="z-10 h-full w-full" onClick={onClick}>
      {props.children}
    </button>
  );
};

export default CompanyHistory;
