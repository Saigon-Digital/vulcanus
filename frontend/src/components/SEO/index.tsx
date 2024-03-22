import {
  GetPageQuery,
  PagesSettingFragment,
  SiteSetting,
  SiteSettingFragment,
  SiteSetting_Fields,
} from "@/__generated__/graphql";
import React from "react";
import {NextSeo} from "next-seo";
export type TSEO = {
  seo?: PagesSettingFragment | null | undefined;
  defaultSEO?: SiteSettingFragment | null | undefined;
  title?: string | null | undefined;
  uri?: string;
};

const SEO = (props: TSEO) => {
  // console.log("seo", props.seo);
  console.log("default ", props.defaultSEO);

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
            `${props.defaultSEO?.siteUrl || ""}${props.uri || ""}`
          }
          // twitter={{site:props.twitterTitle}}
          openGraph={{
            url:
              props.seo?.canonicalUrl ||
              props.defaultSEO?.openGraphImage?.node.sourceUrl ||
              "https://vulcanus.saigondigital.dev/wp-content/uploads/2023/12/vul-hero.png",
            images: [
              {
                url:
                  props.seo?.socialGraphImage?.node.sourceUrl ||
                  props.defaultSEO?.openGraphImage?.node.sourceUrl ||
                  "",
                width: 800,
                height: 600,
                type: "image/png",
              },
            ],
          }}
        />
      )}
    </>
  );
};

export default SEO;
