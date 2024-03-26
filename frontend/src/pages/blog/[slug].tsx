import React from "react";
import {GetStaticProps, GetServerSideProps} from "next";
import {PostFragmentFragment} from "@/__generated__/graphql";
import {getAllPost} from "@/libs/graphql/utils";
import moment from "moment";
import ImageBlock from "@/components/ImageBlock";
import parse from "html-react-parser";
import RelatedPosts from "@/components/RelatedPost";
import SEO from "@/components/SEO";
type Props = {
  blog: PostFragmentFragment;
  relatedBlog: PostFragmentFragment[];
};
const index = ({blog, relatedBlog}: Props) => {
  var dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <>
      <SEO seo={blog.pagesSetting} title={blog.title} />
      <main className=" py-20 pb-10 lg:py-0 lg:pb-0">
        <div className="mx-auto mb-10 flex max-w-[912px] flex-col gap-6 lg:mb-20">
          <h1 className="text-4xl font-bold xl:text-5xl xl:leading-[64px] ">
            {blog.title}
          </h1>
          <p className="text-lg leading-[25px] text-primary-blue-main">
            Posted on {moment(blog.dateGmt).format("Do MMMM YYYY")}
          </p>
        </div>
        <ImageBlock
          height={575}
          maxWidth={false}
          imageSrc={blog.featuredImage?.node?.sourceUrl || ""}
        />
        <div
          className="mx-auto mb-20 mt-20 flex max-w-[912px] flex-col xl:mb-[140px] [&>*>strong]:mt-8 [&>*>strong]:inline-block [&>*>strong]:text-2xl [&>*>strong]:font-bold [&>h3]:text-4xl [&>h4]:text-4xl [&>h4]:font-bold
        [&>h5]:text-4xl [&>p]:mt-4 [&>p]:text-base [&>ul]:mt-2 [&>ul]:list-disc [&>ul]:pl-5
        ">
          {blog.content && parse(blog.content)}
        </div>
        <RelatedPosts posts={relatedBlog} />
      </main>
    </>
  );
};

export const getServerSideProps = (async (context) => {
  const slug = context.params?.slug;
  const {data} = await getAllPost();
  const relatedBLog = data.posts?.nodes?.filter(
    (ele: PostFragmentFragment) => ele.slug !== slug
  );
  const blog = data.posts?.nodes?.find(
    (ele: PostFragmentFragment) => ele.slug === slug
  );
  if (!blog) return {notFound: true};
  return {props: {relatedBlog: relatedBLog, blog: blog}};
}) satisfies GetServerSideProps<{
  blog: Props;
}>;

export default index;
