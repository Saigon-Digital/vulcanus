import React, {useEffect} from "react";
import {GetStaticProps, GetServerSideProps} from "next";
import {
  ImageBlock as TImageBlock,
  LanguageCodeFilterEnum,
  PostFragmentFragment,
  SiteSettingFragment,
  SiteSettings,
} from "@/__generated__/graphql";
import {getAllPost, getPost} from "@/libs/graphql/utils";

import ImageBlock from "@/components/ImageBlock";

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
  slug: string;
};
const BlogPost = ({blog, relatedBlog, locale, host, siteSettings, slug}: Props) => {
  const event = new Date(blog.dateGmt || new Date().getTime());
  const localeStr =
    locale?.toLocaleUpperCase() === LanguageCodeFilterEnum.En
      ? "en-EN"
      : "de-DE";
  let siteTitle = blog.title + " | Vulcanus Stahl";
  let link = host + `/${locale}` + "/blog" + blog.uri;

  const site = process.env.NEXT_PUBLIC_SITE_URL || "";
  const b = blog as any;
  const enUrl = b.ENLang?.slug ? `${site}/en/blog/${b.ENLang.slug}` : null;
  const deUrl = b.DELang?.slug ? `${site}/blog/${b.DELang.slug}` : null;
  const selfPath = `${locale === "en" ? "/en" : ""}${slug}`;
  const selfUrl = `${site}${selfPath}`;

  // Catch-all for variants the server never sees (Netlify collapses "//" and Next
  // strips the default "/de" prefix before getServerSideProps runs).
  useEffect(() => {
    const {pathname, search, hash} = window.location;
    if (decodeURIComponent(pathname) !== decodeURIComponent(selfPath)) {
      window.location.replace(selfPath + search + hash);
    }
  }, [selfPath]);

  return (
    <>
      <SEO
        link={link}
        DEUri={deUrl}
        ENUri={enUrl}
        defaultSEO={{...siteSettings.siteSetting, siteTitle: siteTitle}}
        seo={blog.pagesSetting}
        slug={slug}
        canonical={selfUrl}
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
          imageSrc={blog.featuredImage?.node?.sourceUrl || "/blogs/blog-3.png"}
        />
        {blog?.content && (
          <div
            dangerouslySetInnerHTML={{__html: blog.content}}
            className="post-content mx-auto mb-20 mt-20 flex max-w-[912px] flex-col px-5  xl:mb-[140px] [&>*>strong]:mt-8 [&>*>strong]:inline-block [&>*>strong]:text-2xl [&>*>strong]:font-bold [&>h3]:text-4xl [&>h4]:text-4xl [&>h4]:font-bold
        [&>h5]:text-4xl [&>p]:mt-4 [&>p]:text-base [&>ul]:mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>a]:underline [&>a]:text-[#004594] 
        "></div>
        )}
        {/* <RelatedPosts posts={relatedBlog} /> */}
      </main>
    </>
  );
};

export const getServerSideProps = (async (context) => {
  let host = context.req.headers.host;
  const slug:string = context.params?.slug as string;
  const {data} = (await getPost(slug)) as any;
  const locale = context.locale;
  const siteSettings = data.siteSettings;
  // const relatedBLog = data.posts?.nodes?.filter(
  //   (ele: PostFragmentFragment) =>
  //     ele.slug !== slug && ele.language?.code === locale?.toLocaleUpperCase()
  // );
  const blog = data?.post;
  if (!blog) return {notFound: true};

  // Canonical form: EN -> /en/blog/<slug>, DE -> /blog/<slug> (no /de prefix).
  // Redirect wrong locale or wrong slug. Next strips the default /de prefix before we see it,
  // so /de/blog/* is redirected at the Netlify edge (public/_redirects).
  const postLang = blog.language?.code === "EN" ? "en" : "de";
  const canonical = `${postLang === "en" ? "/en" : ""}/blog/${blog.slug}`;
  if (
    postLang !== locale ||
    decodeURIComponent(slug) !== decodeURIComponent(blog.slug)
  ) {
    return {redirect: {destination: canonical, permanent: true}};
  }

  return {
    props: {
      // relatedBlog: relatedBLog,
      blog: blog,
      locale: locale,
      host,
      siteSettings: siteSettings,
      hideLanguageToggle: false,
      slug: `/blog/${blog.slug}`,
      __TEMPLATE_QUERY_DATA__: {
        page: {
          translation: {
            DELang: {
              link: `/de/blog/${blog.DELang?.slug}`,
            },
            ENLang: {
              link: `/en/blog/${blog.ENLang?.slug}`,
            },
          },
        },
      },
    },
  };
}) satisfies GetServerSideProps<{
  blog: Props;
}>;

export default BlogPost;
