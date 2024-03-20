import {GetPageQuery} from "@/__generated__/graphql";
import React from "react";
import {NextSeo} from "next-seo";
export type TSEO = {
  __typename?: "PostTypeSEO";
  canonical?: string | null;
  title?: string | null;
  metaDesc?: string | null;
  focuskw?: string | null;
  metaRobotsNoindex?: string | null;
  metaRobotsNofollow?: string | null;
  opengraphAuthor?: string | null;
  opengraphDescription?: string | null;
  opengraphTitle?: string | null;
  opengraphUrl?: string | null;
  opengraphSiteName?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  opengraphImage?: {
    __typename?: "MediaItem";
    altText?: string | null;
    sourceUrl?: string | null;
    srcSet?: string | null;
  } | null;
  twitterImage?: {
    __typename?: "MediaItem";
    altText?: string | null;
    sourceUrl?: string | null;
    srcSet?: string | null;
  } | null;
};
const SEO = (props: TSEO) => {
  return (
    <>
      <NextSeo
        title={props.title || "Vulcanus Stahl"}
        description={props.metaDesc || ""}
        canonical={
          props.canonical ||
          "https://vulcanus.saigondigital.dev/wp-content/uploads/2023/12/vul-hero.png"
        }
        // twitter={{site:props.twitterTitle}}
        openGraph={{
          url: props.opengraphUrl || "",
          images: [
            {
              url: props.opengraphImage?.sourceUrl || "",
              width: 800,
              height: 600,
              type: "image/png",
            },
          ],
        }}
      />
    </>
  );
};

export default SEO;
