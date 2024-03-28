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

  const pathname = usePathname();
  const router = useRouter();
  const locale =
    router.locale?.toLocaleUpperCase() === LanguageCodeFilterEnum.De
      ? ""
      : "en";

  const defaultPath = `${props.defaultSEO?.siteUrl || SITE_URL}${
    locale !== "" ? locale + "/" : ""
  }${pathname.replace("/", "")}`;

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
        languageAlternates={[
          {
            hrefLang: "de",
            href: props.defaultSEO?.siteUrl || SITE_URL || "",
          },
          {
            hrefLang: "en",
            href: `${props.defaultSEO?.siteUrl}en` || `${SITE_URL}en` || "",
          },
        ]}
        canonical={props.seo?.canonicalUrl || defaultPath}
        // twitter={{site:props.twitterTitle}}
        openGraph={{
          locale: router.locale,
          url:
            props.seo?.canonicalUrl ||
            `${props.defaultSEO?.siteUrl || SITE_URL}${locale}${pathname}`,
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
