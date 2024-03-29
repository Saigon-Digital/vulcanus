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
  translations?:
    | ({
        __typename?: "Page" | undefined;
        slug?: string | null | undefined;
        uri?: string | null | undefined;
      } | null)[]
    | null
    | undefined;
  opengraphUrl?: string | null | undefined;
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

  const defaultPath = `${siteUrl}${props.uri}`;

  let translationUri = props.translations ? props.translations[0]?.uri : "";

  if (translationUri === "/" && locale === "de") {
    translationUri = "/en";
  }

  let translation = `${siteUrl}${translationUri}`;

  // console.log("tranlations", defaultPath, translation);

  const languageOptions =
    locale === "en"
      ? [
          {
            hrefLang: "x-default",
            href: props.seo?.canonicalUrl || defaultPath,
          },
          {
            hrefLang: "de",
            href: translation,
          },
        ]
      : [
          {
            hrefLang: "x-default",
            href: props.seo?.canonicalUrl || defaultPath,
          },
          {
            hrefLang: "en",
            href: translation,
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
