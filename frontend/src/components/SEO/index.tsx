import {
  PagesSettingFragment,
  SiteSettingFragment,
} from "@/__generated__/graphql";
import Head from "next/head";
export type TSEO = {
  seo?: PagesSettingFragment | null | undefined;
  ENUri?: string | null | undefined;
  DEUri?: string | null | undefined;
  defaultSEO?: SiteSettingFragment | null | undefined;
  link?: string | null | undefined;
  pageTitle?: string;
};
const SEO = (props: TSEO) => {
  const {seo: onPageSeo, link, defaultSEO, DEUri, ENUri} = props;
  const favicon = defaultSEO?.favicon?.node?.sourceUrl;

  const seo = {
    title: onPageSeo?.title || defaultSEO?.siteTitle,
    description: onPageSeo?.description || defaultSEO?.description,
    image:
      onPageSeo?.socialGraphImage?.node?.sourceUrl ||
      defaultSEO?.openGraphImage?.node.sourceUrl,
    seoCanonical: onPageSeo?.canonicalUrl || link?.replace("homepage/", ""),
    url: link?.replace("homepage/", ""),
  };

  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={favicon || "/images/favicon.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={favicon || "/images/favicon.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={favicon || "/images/favicon.png"}
      />

      {seo.title && (
        <>
          <title>{seo.title}</title>
          <meta name="title" content={seo.title} />
          <meta property="og:title" content={seo.title} />
          <meta property="twitter:title" content={seo.title} />
        </>
      )}

      {seo.description && (
        <>
          <meta name="description" content={seo.description} />
          <meta property="og:description" content={seo.description} />
          <meta property="twitter:description" content={seo.description} />
        </>
      )}

      {seo.image && (
        <>
          <meta property="og:image" content={seo.image} />
          <meta property="twitter:image" content={seo.image} />
        </>
      )}

      {seo.url && (
        <>
          <meta property="og:url" content={seo.url} />
          <meta property="twitter:url" content={seo.url} />
        </>
      )}
      {props.seo?.noIndexNoFollow && (
        <meta name="robots" content="noindex, nofollow" />
      )}

      {seo.seoCanonical && <link rel="canonical" href={seo.seoCanonical} />}
      {DEUri && <link rel="alternate" hrefLang="x-default" href={DEUri} />}
      {ENUri && (
        <link
          rel="alternate"
          hrefLang="en"
          href={ENUri?.replace("homepage/", "")}
        />
      )}
    </Head>
  );
};

export default SEO;
