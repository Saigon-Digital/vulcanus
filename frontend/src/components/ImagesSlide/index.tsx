import {ImagesSLideFragment} from "@/__generated__/graphql";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, A11y} from "swiper/modules";
import Head from "next/head";
import "swiper/css/autoplay";

import ImageWithRatio from "../ImageWithRatio";
import {useModalContext} from "@/context/modalContext";
import Modal from "../Modal";
import {useEffect} from "react";

const ImagesSlide = (props: ImagesSLideFragment) => {
  const {openModal, setGallery} = useModalContext();
  useEffect(() => {
    setGallery(props.slides?.map((e) => e?.image?.node.sourceUrl));
  }, []);
  return (
    <>
      <div className={`image-slide mx-auto w-full max-w-sm sm:max-w-none`}>
        <Head>
          {props.slides &&
            props.slides?.length > 0 &&
            props.slides?.map((e, id) => {
              return (
                <link
                  key={id}
                  rel="preload"
                  href={e?.image?.node.sourceUrl || ""}
                />
              );
            })}
        </Head>
        <Modal />
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 26,
            },
            1920: {
              slidesPerView: 5,
              spaceBetween: 34,
            },
          }}
          spaceBetween={35}
          // navigation={}

          modules={[Autoplay, Navigation, A11y]}
          autoplay={{
            disableOnInteraction: true,
            delay: 0,
            stopOnLastSlide: false,
          }}
          slidesPerView={1}
          loop={true}
          wrapperClass="!ease-linear !px-10"
          freeMode={true}
          speed={5000}>
          {props.slides &&
            props.slides.map((ele, index) => {
              // const src = ele && urlForImage(ele)?.url();
              // if (!ele.dimention.w || !ele.dimention.h) return null;

              return (
                <SwiperSlide
                  key={index}
                  onClick={() => openModal(ele?.image?.node?.sourceUrl)}
                  className="h-[480px] cursor-pointer">
                  {/* <div className="relative aspect-video w-full"> */}
                  <ImageWithRatio
                    imageSrc={ele?.image?.node.sourceUrl || ""}
                    height={480}
                  />
                  {/* </div> */}
                </SwiperSlide>
              );
            })}
        </Swiper>

        <div className="logo-swiper-pagination mt-16 text-center lg:mt-24"></div>
      </div>
    </>
  );
};

export default ImagesSlide;
