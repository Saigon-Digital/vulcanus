import React from "react";
import {GetStaticProps, GetServerSideProps} from "next";
import {
  LanguageCodeFilterEnum,
  PostFragmentFragment,
  SiteSettingFragment,
  SiteSettings,
} from "@/__generated__/graphql";
import {getAllPost} from "@/libs/graphql/utils";

import ImageBlock from "@/components/ImageBlock";
import parse from "html-react-parser";
import RelatedPosts from "@/components/RelatedPost";
import SEO from "@/components/SEO";

import {languages} from "@/utils/language";
type Props = {
  blog: PostFragmentFragment;
  locale: string;
  relatedBlog: PostFragmentFragment[];
  siteSettings: {
    siteSetting: SiteSettingFragment;
  };
  host?: string;
};
const index = ({blog, relatedBlog, locale, host, siteSettings}: Props) => {
  const event = new Date(blog.dateGmt || new Date().getTime());
  const localeStr =
    locale?.toLocaleUpperCase() === LanguageCodeFilterEnum.En
      ? "en-EN"
      : "de-DE";
  let siteTitle = blog.title + " | Vulcanus Stahl";
  let link = host + `/${locale}` + "/blog" + blog.uri;
  let DEUri = host + `/de` + "/blog" + blog.uri;
  let ENUri = host + `/en` + "/blog" + blog.uri;
  return (
    <>
      <SEO
        link={link}
        DEUri={DEUri}
        ENUri={ENUri}
        defaultSEO={{...siteSettings.siteSetting, siteTitle: siteTitle}}
        seo={blog.pagesSetting}
      />
      <main className="  py-20 pb-10 lg:py-0 lg:pb-0">
        <div className="mx-auto mb-10 flex max-w-[912px] flex-col gap-6 px-5 lg:mb-20">
          <h1 className="text-4xl font-bold xl:text-5xl xl:leading-[64px] ">
            {blog.title}
          </h1>
          <p className="text-lg leading-[25px] text-primary-blue-main">
            {languages(locale)?.posted}{" "}
            {event.toLocaleDateString(localeStr, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <ImageBlock
          height={575}
          maxWidth={false}
          className="px-5"
          imageSrc={blog.featuredImage?.node?.sourceUrl || ""}
        />
        <div
          className="mx-auto mb-20 mt-20 flex max-w-[912px] flex-col px-5  xl:mb-[140px] [&>*>strong]:mt-8 [&>*>strong]:inline-block [&>*>strong]:text-2xl [&>*>strong]:font-bold [&>h3]:text-4xl [&>h4]:text-4xl [&>h4]:font-bold
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
  let host = context.req.headers.host;
  const slug = context.params?.slug;
  const {data} = await getAllPost() as any;
  const locale = context.locale;
  const siteSettings = data.siteSettings;
  const relatedBLog = data.posts?.nodes?.filter(
    (ele: PostFragmentFragment) => ele.slug !== slug
  );
  const blog = data.posts?.nodes?.find(
    (ele: PostFragmentFragment) => ele.slug === slug
  );
  if (!blog) return {notFound: true};
  return {
    props: {
      relatedBlog: relatedBLog,
      blog: blog,
      locale: locale,
      host,
      siteSettings: siteSettings,
    },
  };
}) satisfies GetServerSideProps<{
  blog: Props;
}>;

export default index;
