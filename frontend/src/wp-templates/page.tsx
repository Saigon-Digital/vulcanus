import BlockViewer from "@/wp-blocks/BlockViewer";
import {FaustTemplate} from "@faustwp/core";
import {useRouter} from "next/router";
import {gql} from "../__generated__";
import {GetPageQuery, LanguageCodeEnum} from "../__generated__/graphql";
import Head from "next/head";
import {INTRODUCE_PAGE} from "@/constant";
import IntroduceBlock from "@/components/IntroduceBlock";
import SEO from "@/components/SEO";
import { DefaultSeo } from "next-seo";
import defaultSEO from "../next-seo.config"
const Page: FaustTemplate<GetPageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const dynamicBlocks =
    props?.data?.page?.translation?.pageBuilder?.dynamicBlocks || [];

  const language = props.__TEMPLATE_VARIABLES__?.language;

  // const pathname = props.data?.page?.translation?.uri;
  const siteSetting = props.data?.siteSettings?.siteSetting;
  return (
    <>
      <SEO {...props.data?.page?.translation?.seo} />
      <DefaultSeo
      title={siteSetting?.siteTitle || defaultSEO.title }
      description={siteSetting?.description || defaultSEO.description}
      openGraph={siteSetting?.}
      />
      <BlockViewer dynamicBlocks={dynamicBlocks} />
    </>
  );
};

Page.variables = ({databaseId}, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    language: ctx?.locale === "en" ? LanguageCodeEnum.En : LanguageCodeEnum.De,
  };
};

Page.query = gql(`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false, $language: LanguageCodeEnum!) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      translation(language: $language) {
        uri
        title
        content
        pageType {
          nodes {
           name
          }
        }
        language {
          code
        }
        seo {
          canonical
          title
          metaDesc
          focuskw
          metaRobotsNoindex
          metaRobotsNofollow
          opengraphAuthor
          opengraphDescription
          opengraphTitle
          opengraphDescription
          opengraphImage 
          {
              altText
              sourceUrl
              srcSet
          }
          opengraphUrl
          opengraphSiteName
          
          twitterTitle
          twitterDescription
          twitterImage 
          {
            altText
            sourceUrl
            srcSet
          }
       }
        pageBuilder {
        ...PageBuilder
        }
      }
    }
    siteSettings {
      siteSetting {
        siteUrl
        siteTitle
        description
        openGraphImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`);

export default Page;
