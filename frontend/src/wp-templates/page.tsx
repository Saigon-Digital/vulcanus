import BlockViewer from "@/wp-blocks/BlockViewer";
import {FaustTemplate} from "@faustwp/core";
import {useRouter} from "next/router";
import {gql} from "../__generated__";
import {GetPageQuery, LanguageCodeEnum} from "../__generated__/graphql";
import Head from "next/head";

import IntroduceBlock from "@/components/IntroduceBlock";
import SEO from "@/components/SEO";

const Page: FaustTemplate<GetPageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const dynamicBlocks =
    props?.data?.page?.translation?.pageBuilder?.dynamicBlocks || [];

  // const language = props.__TEMPLATE_VARIABLES__?.language;

  // const pathname = props.data?.page?.translation?.uri;
  const siteSetting = props.data?.siteSettings;
  return (
    <>
      <SEO
        DEUri={props?.data?.page?.DELang?.link}
        ENUri={props.data?.page?.ENLang?.link}
        seo={props?.data?.page?.translation?.pagesSetting}
        defaultSEO={siteSetting?.siteSetting}
        link={props?.data?.page?.link}
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
      link
      ENLang: translation(language: EN) {
        link
      }
      DELang: translation(language: DE) {
        link
      }
      translations {
        slug
        uri
      }
      translation(language: $language) {
        uri
        title
        content
        slug
        pageType {
          nodes {
           name
          }
        }
        language {
          code
        }
        ENLang:translation (language:EN) {
          uri
        }
        DELang:translation(language: DE) {
          uri
        }
        pagesSetting {
          ...pagesSetting
        }

        pageBuilder {
        ...PageBuilder
        }
      }
      seo {
        opengraphUrl
      }
    }

    siteSettings {
      siteSetting {
        ...SiteSetting
      }
    }
  }
`);

export default Page;
