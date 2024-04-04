import {
  BlogsBlockFragment,
  LanguageCodeFilterEnum,
} from "@/__generated__/graphql";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";
import {ButtonNext} from "../Icons";
import {getPostThumb} from "@/libs/graphql/utils";
import {GetPostsThumbQuery} from "@/__generated__/graphql";
import {useRouter} from "next/router";
import {log} from "console";
import {languages} from "@/utils/language";
import {getAcfLinkProps} from "@/utils";
type TBlog = {
  category?: string;
  featureImage?: string;
  title?: string;
  description?: string;
  link?: string;
};
const DEFAULT_BLOG: TBlog[] = [
  {
    category: "Manufacturing",
    featureImage: "/blogs/blog-1.png",
    title: "Exploring the CNC Capabilities of Vulcanus Company",
    link: "#",
    description:
      "Discover the technological prowess behind Vulcanus Company's CNC manufacturing. Learn about their state-of-the-art equipment, their capacity for large-scale productions, and the diverse materials they expertly handle.",
  },
  {
    category: "Manufacturing",
    featureImage: "/blogs/blog-1.png",
    title: "Exploring the CNC Capabilities of Vulcanus Company",
    link: "#",
    description:
      "Discover the technological prowess behind Vulcanus Company's CNC manufacturing. Learn about their state-of-the-art equipment, their capacity for large-scale productions, and the diverse materials they expertly handle.",
  },
  {
    category: "Manufacturing",
    featureImage: "`/blogs/blog-1.png`",
    title: "Exploring the CNC Capabilities of Vulcanus Company",
    link: "#",
    description:
      "Discover the technological prowess behind Vulcanus Company's CNC manufacturing. Learn about their state-of-the-art equipment, their capacity for large-scale productions, and the diverse materials they expertly handle.",
  },
];
interface Props extends BlogsBlockFragment {}
const PAGE_SIZE = 3;
const BlogsBlock = (props: Props) => {
  const [blockListing, setBlockListing] = useState([]);
  const router = useRouter();
  const locale = router.locale;
  const [page, setPage] = useState(0);
  const max_page = Math.floor([...blockListing].length / PAGE_SIZE);
  console.log("blog listing", blockListing);

  useEffect(() => {
    (async () => {
      const {data} = await getPostThumb();
      const blogs =
        data.posts?.nodes.filter(
          (blog) => blog.language?.code === locale?.toLocaleUpperCase()
        ) || [];
      setBlockListing(blogs as any);
    })();
  }, []);

  if (blockListing.length < 1)
    return (
      <div className="container-fluid min-h-[500px] pt-10">
        {locale?.toUpperCase() === LanguageCodeFilterEnum.En
          ? "...Loading"
          : "...Wird geladen"}
      </div>
    );

  return (
    <section className="container-fluid py-20 lg:py-28 lg:pb-20">
      <div className="grid grid-cols-12">
        <div className="col-span-full flex  flex-col gap-10 md:col-span-8">
          {blockListing &&
            blockListing
              .slice(
                0,
                (page + 1) * PAGE_SIZE > blockListing.length
                  ? blockListing.length
                  : (page + 1) * PAGE_SIZE
              )
              .map((ele: any, id) => {
                return (
                  <div
                    key={id}
                    className=" flex flex-wrap gap-5 lg:min-h-[350px] ">
                    <div className="relative min-h-[250px] w-full md:w-[45%]">
                      <Link
                        href={`/${router.locale}/blog/${ele.slug}` as string}>
                        <Image
                          fill
                          className=" max-h-[400px] w-full object-cover"
                          src={
                            ele.featuredImage?.node?.sourceUrl ||
                            "/blogs/blog-1.png"
                          }
                          alt="blog image"
                        />
                      </Link>
                    </div>
                    <div className="flex w-full flex-col justify-center gap-2 md:w-1/2">
                      <h2 className="text-lg font-semibold uppercase leading-5 text-primary-blue-main">
                        {languages(router.locale)?.manufacturing}
                      </h2>
                      <h3 className="text-3xl font-bold xl:text-4xl  xl:leading-[48px]">
                        <Link
                          href={`/${router.locale}/blog/${ele.slug}` as string}
                          className="group hover:text-primary-blue-main">
                          {ele.title}
                        </Link>
                      </h3>
                      <p className="text text-base leading-[22px]">
                        {ele.blogDescription?.blogDescription}
                      </p>
                      <Link
                        href={`/${router.locale}/blog/${ele.slug}` as string}
                        className="group mt-5 text-primary-blue-main">
                        {languages(locale)?.readMore}
                        <ButtonNext className="ml-2 inline transition-all group-hover:translate-x-2" />
                      </Link>
                    </div>
                  </div>
                );
              })}
          <div className="mt-10 flex w-full justify-center">
            {blockListing.length > PAGE_SIZE &&
              (page + 1) * PAGE_SIZE < blockListing.length && (
                <Button
                  onClick={() =>
                    setPage((prev) => {
                      return prev + 1 >= max_page ? max_page : prev + 1;
                    })
                  }
                  as="button">
                  {languages(locale)?.loadMore}
                </Button>
              )}
          </div>
        </div>
        <div className="col-span-full mt-10 md:col-span-6 lg:col-span-3 lg:col-start-10 lg:mt-0">
          {props.ctaBlocks?.map((ele, id) => {
            if (id === 0)
              return (
                <div className="flex w-full flex-col gap-4 rounded-md border border-primary-blue-main p-6">
                  <h3 className="text-2xl font-semibold text-primary-blue-main ">
                    {ele?.title}
                  </h3>
                  <div
                    className="[&>*>a]:underline xl:[&>*]:text-lg xl:[&>*]:leading-[25px]"
                    dangerouslySetInnerHTML={{
                      __html: ele?.contactInfo || "",
                    }}></div>
                  {ele?.ctaButton && (
                    <Button
                      className="mt-4"
                      {...getAcfLinkProps(ele.ctaButton.link)}>
                      {ele?.ctaButton?.text}
                    </Button>
                  )}
                </div>
              );
            if (id === 1)
              return (
                <div className="mt-6 flex w-full flex-col gap-4 rounded-md border bg-[#E6ECF3] p-6">
                  <h3 className="text-2xl font-semibold text-primary-blue-main ">
                    {ele?.title}
                  </h3>
                  <div
                    className="[&>*>a]:underline [&>*]:text-[#140F24] xl:[&>*]:text-lg xl:[&>*]:leading-[25px]"
                    dangerouslySetInnerHTML={{
                      __html: ele?.contactInfo || "",
                    }}></div>
                  {ele?.ctaButton && (
                    <Button
                      className="mt-4"
                      {...getAcfLinkProps(ele.ctaButton.link)}>
                      {ele?.ctaButton?.text}
                    </Button>
                  )}
                </div>
              );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogsBlock;
