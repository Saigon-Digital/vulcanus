import {Certifications as T} from "@/__generated__/graphql"
import {Swiper, SwiperSlide} from "swiper/react"
import {Autoplay} from "swiper/modules"
import Image from "next/image"
import Link from "next/link"
const Certifications = (props: T) => {
  const certifications = props?.certification || []
  return (
    <section className="relative">
      <Image
        src="/shapes/imageShape.png"
        width={47}
        height={155}
        alt="imageShape"
        className="absolute left-0 top-20 hidden h-[155px] w-[47px] lg:block 2xl:top-36"
      />
      <div className="container-fluid py-14 lg:py-28 2xl:py-[190px]">
        <div className="flex flex-col justify-center lg:flex-row lg:justify-between">
          <h2 className="mb-10 text-center text-3xl font-bold text-white lg:ml-10 xl:text-5xl xl:leading-[67px]">
            <span>Certifications</span>
          </h2>
          <div className="w-full lg:w-[70%]">
            <Swiper
              slidesPerView={1}
              spaceBetween={24}
              breakpoints={{
                220: {
                  slidesPerView: 1,
                },

                480: {
                  slidesPerView: 2,
                },

                840: {
                  slidesPerView: 3,
                },
              }}
              loop={true}
              modules={[Autoplay]}>
              {certifications?.map((certification, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Link
                      target="_blank"
                      href={certification?.document?.node?.mediaItemUrl || ""}
                      className="relative mb-4  aspect-[450/595] w-full lg:min-h-[595px]">
                      <Image
                        width={450}
                        height={595}
                        alt="team member"
                        className="object-cover"
                        src={certification?.preview?.node?.sourceUrl || ""}
                      />
                    </Link>
                    <h4 className="mt-6 text-center text-xl font-bold uppercase text-white xl:text-left">
                      {certification?.certificationName || ""}
                    </h4>
                    <p className="text-center text-base font-light text-primary-blue-200 xl:text-left">
                      {certification?.description || ""}
                    </p>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certifications
