import {
  GetPageQuery,
  PagesSettingFragment,
  SiteSetting,
  SiteSettingFragment,
  SiteSetting_Fields,
} from "@/__generated__/graphql";
import React from "react";
import {NextSeo} from "next-seo";
import {useRouter} from "next/router";

export type TSEO = {
  seo?: PagesSettingFragment | null | undefined;
  defaultSEO?: SiteSettingFragment | null | undefined;
  title?: string | null | undefined;
  slug?: string;
  // locale?: string;
};
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const SEO = (props: TSEO) => {
  // console.log("seo", props.seo);
  console.log(SITE_URL);

  const router = useRouter();
  const locale = router.locale?.toLocaleLowerCase();
  return (
    <>
      {props.seo && (
        <NextSeo
          title={
            props.seo?.title ||
            (props.title && `${props.title} | Vulcanus`) ||
            props.defaultSEO?.siteTitle ||
            "Vulcanus Stahl"
          }
          description={
            props.seo?.description || props.defaultSEO?.description || ""
          }
          canonical={
            props.seo?.canonicalUrl ||
            `${props.defaultSEO?.siteUrl || SITE_URL}${locale}/${
              props.slug || ""
            }`
          }
          // twitter={{site:props.twitterTitle}}
          openGraph={{
            url:
              props.seo?.canonicalUrl ||
              `${props.defaultSEO?.siteUrl || SITE_URL}${locale}/${
                props.slug || ""
              }`,
            type: "website",
            images: [
              {
                url:
                  props.seo?.socialGraphImage?.node.sourceUrl ||
                  props.defaultSEO?.openGraphImage?.node.sourceUrl ||
                  "",
                width: 800,
                height: 600,
                type: "image",
              },
            ],
          }}
        />
      )}
    </>
  );
};

export default SEO;