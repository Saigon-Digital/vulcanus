"use client";
import {
  GetPageQuery,
  PagesSettingFragment,
  SiteSetting,
  SiteSettingFragment,
  SiteSetting_Fields,
} from "@/__generated__/graphql";
import React from "react";
import {NextSeo} from "next-seo";
import {usePathname} from "next/navigation";
import {useRouter} from "next/router";
import {LanguageCodeFilterEnum} from "@/__generated__/graphql";
import {urlHelper} from "@/utils";
export type TSEO = {
  seo?: PagesSettingFragment | null | undefined;
  ENUri?: string | null | undefined;
  DEUri?: string | null | undefined;

  defaultSEO?: SiteSettingFragment | null | undefined;
  title?: string | null | undefined;
  uri?: string | null | undefined;
  // locale?: string;
};
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const SEO = (props: TSEO) => {
  // console.log("seo", props.seo);

  const router = useRouter();

  const locale =
    router.locale?.toLocaleUpperCase() === LanguageCodeFilterEnum.De
      ? "de"
      : "en";
  const siteUrl = urlHelper(props.defaultSEO?.siteUrl || SITE_URL || "");

  // let translationUri = props.translations ? props.translations[0]?.uri : "";

  // if (translationUri === "/" && locale === "de") {
  //   translationUri = "/en";

  const defaultPath = `${siteUrl}${props.uri}`;

  let enUri = props.ENUri === "/" || props.ENUri === "" ? "/en" : props.ENUri;
  const languageOptions = [
    {
      hrefLang: "x-default",
      href: props.seo?.canonicalUrl || `${siteUrl}${props.DEUri || ""}`,
    },
    {
      hrefLang: "en",
      href: props.seo?.canonicalUrl || `${siteUrl}${enUri || ""}`,
    },
  ];

  return (
    <>
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
        languageAlternates={languageOptions}
        canonical={props.seo?.canonicalUrl || defaultPath || ""}
        // twitter={{site:props.twitterTitle}}
        openGraph={{
          locale: router.locale,
          url: props.seo?.canonicalUrl || defaultPath || "",
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
    </>
  );
};

export default SEO;
