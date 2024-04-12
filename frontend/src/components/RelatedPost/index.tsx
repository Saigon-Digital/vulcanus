import {PostFragmentFragment} from "@/__generated__/graphql";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {ButtonNext} from "../Icons";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";
import {languages} from "@/utils/language";
import {useLocaleContext} from "@/context/LocaleContext";

type Props = {
  posts: PostFragmentFragment[];
};
const RelatedPosts = ({posts}: Props) => {
  const {locale} = useLocaleContext();
  if (!posts || posts.length < 1) return null;
  return (
    <div className=" bg-primary-midBlue-main px-6 pb-12 pt-12">
      <h4 className="mb-8 text-5xl font-bold 2xl:text-[64px] 2xl:leading-[89px]">
        {languages(locale)?.relatedPost}
      </h4>
      <div className="w-full">
        <Swiper
          className="!overflow-visible"
          modules={[Pagination, Autoplay]}
          autoplay={{delay: 4000}}
          height={460}
          spaceBetween={24}
          pagination
          slidesPerView={4}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}>
          {posts &&
            posts.map((ele, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="group flex flex-col gap-4">
                    <Link href={`/blog/${ele.slug}`}>
                      <div className="relative aspect-[450/290] w-full overflow-hidden">
                        <Image
                          className="aspect-[450/290] w-full transition-all group-hover:scale-105"
                          src={
                            ele.featuredImage?.node.sourceUrl ||
                            "/blogs/blog-1.png"
                          }
                          alt="related post"
                          width={450}
                          height={296}
                        />
                      </div>
                    </Link>
                    <p className="text-lg font-semibold uppercase leading-[20px] text-[#E6ECF3]">
                      {languages(locale)?.manufacturing}
                    </p>
                    <h4 className="flex-[68px] text-2xl font-bold">
                      {ele.title}
                    </h4>
                    <p className="text-base leading-[22px]">
                      Discover the technological prowess behind Vulcanus
                      Company&apos; CNC manufacturing. Learn about their
                      state-of-the-art equipment, their capacity for large-scale
                      productions, and the diverse materials they expertly
                      handle.
                    </p>
                    <Link
                      className="group flex gap-1 text-lg"
                      href={`/blog/${ele.slug}`}>
                      {languages(locale)?.readMore}
                      <ButtonNext className="text-white transition-all group-hover:translate-x-2" />
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedPosts;
