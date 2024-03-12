import {PostFragmentFragment} from "@/__generated__/graphql";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {ButtonNext} from "../Icons";
type Props = {
  posts: PostFragmentFragment[];
};
const RelatedPosts = ({posts}: Props) => {
  return (
    <div className="container-fluid bg-primary-midBlue-main px-6 pb-12 pt-12">
      <h4 className="mb-8 text-5xl font-bold">Related post</h4>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {posts.map((ele, index) => {
          return (
            <div key={index} className="flex flex-col gap-4">
              <Image
                className="aspect-[450/290] w-full"
                src={ele.featuredImage?.node.sourceUrl || "/blogs/blog-1.png"}
                alt="related post"
                width={450}
                height={296}
              />
              <p className="text-lg uppercase">Manufacturing</p>
              <h4 className="text-2xl">{ele.title}</h4>
              <p>
                Discover the technological prowess behind Vulcanus Company&apos;
                CNC manufacturing. Learn about their state-of-the-art equipment,
                their capacity for large-scale productions, and the diverse
                materials they expertly handle.
              </p>
              <Link
                className="group flex gap-1 text-lg"
                href={`/blog/${ele.slug}`}>
                Read More
                <ButtonNext className="text-white transition-all group-hover:translate-x-2" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPosts;