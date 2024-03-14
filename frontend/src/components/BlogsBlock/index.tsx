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
const BlogsBlock = () => {
  const [blockListing, setBlockListing] = useState([]);
  const router = useRouter();
  const locale = router.locale;
  useEffect(() => {
    (async () => {
      const {data} = await getPostThumb(locale as LanguageCodeFilterEnum);
      console.log(data);

      setBlockListing(data.posts?.nodes);
    })();
  }, []);
  //   console.log(blockListing);

  //   return;

  if (blockListing.length < 1) return null;

  return (
    <section className="container-fluid py-20 lg:py-28">
      <div className="grid grid-cols-12">
        <div className="col-span-full flex  flex-col gap-10 md:col-span-8">
          {blockListing.map((ele: any, id) => {
            return (
              <div key={id} className=" flex flex-wrap gap-5 lg:min-h-[350px] ">
                <div className="relative min-h-[250px] w-full md:w-[45%]">
                  <Image
                    fill
                    className=" max-h-[400px] w-full object-cover"
                    src={
                      ele.featuredImage?.node?.sourceUrl || "/blogs/blog-1.png"
                    }
                    alt="blog image"
                  />
                </div>
                <div className="flex w-full flex-col justify-center gap-2 md:w-1/2">
                  <h4 className="text-xl uppercase text-primary-blue-main">
                    Manufacturing
                  </h4>
                  <h2 className="text-3xl font-bold">{ele.title}</h2>
                  <p className="text text-base">
                    {ele.blogDescription?.blogDescription}
                  </p>
                  <a
                    href={`/${router.locale}/blog/${ele.slug}` as string}
                    className="group mt-5 text-primary-blue-main">
                    Read More
                    <ButtonNext className="ml-2 inline transition-all group-hover:translate-x-2" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-span-full mt-10 md:col-span-6 lg:col-span-3 lg:col-start-10 lg:mt-0">
          <div className="flex w-full flex-col gap-4 rounded-md border border-primary-blue-main p-6">
            <h3 className="text-2xl text-primary-blue-main ">Get in touch</h3>
            <p>
              We are your partner for CNC manufacturing of individual parts and
              series, specialised constructions, and repair work.
            </p>
            <Button as="link" className="mt-4" href="#">
              Get in touch
            </Button>
          </div>
          <div className="mt-6 flex w-full flex-col gap-4 rounded-md border bg-white p-6">
            <h3 className="text-2xl text-primary-blue-main ">Get in touch</h3>
            <p className="text-black">
              Please apply in writing, preferably by e-mail, to:
              bewerbung@vulcanus-stahl.deWe look forward to receiving your
              applications.
            </p>
            <Button as="link" className="mt-4" href="#">
              work with us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsBlock;
