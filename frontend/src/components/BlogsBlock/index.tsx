import {BlogsBlockFragment} from "@/__generated__/graphql";
import React from "react";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";
import {ButtonNext} from "../Icons";
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
    featureImage: "/blogs/blog-1.png",
    title: "Exploring the CNC Capabilities of Vulcanus Company",
    link: "#",
    description:
      "Discover the technological prowess behind Vulcanus Company's CNC manufacturing. Learn about their state-of-the-art equipment, their capacity for large-scale productions, and the diverse materials they expertly handle.",
  },
];
interface Props extends BlogsBlockFragment {
  blockListing: TBlog[];
}
const BlogsBlock = ({blockListing = DEFAULT_BLOG}: Props) => {
  return (
    <div className="container-fluid py-20 lg:py-28">
      <div className="grid grid-cols-12">
        <div className="col-span-full flex flex-col gap-10 md:col-span-8">
          {blockListing.map((ele, id) => {
            return (
              <div key={id} className=" flex min-h-[350px] gap-5 ">
                <Image
                  width={608}
                  height={400}
                  className="aspect-[608/400] h-full max-h-[400px] w-1/2 flex-grow object-contain"
                  src={ele.featureImage || ""}
                  alt="blog iamge"
                />
                <div className="flex flex-col justify-center gap-2">
                  <h4 className="text-xl uppercase text-primary-blue-main">
                    {ele.category}
                  </h4>
                  <h2 className="text-3xl font-bold">{ele.title}</h2>
                  <p className="text text-base">{ele.description}</p>
                  <Link
                    as="link"
                    href={ele.link as string}
                    className="mt-5 text-primary-blue-main">
                    Read More
                    <ButtonNext className="ml-2 inline" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogsBlock;
