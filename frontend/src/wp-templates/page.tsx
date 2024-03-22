import BlockViewer from "@/wp-blocks/BlockViewer";
import {FaustTemplate} from "@faustwp/core";
import {useRouter} from "next/router";
import {gql} from "../__generated__";
import {GetPageQuery, LanguageCodeEnum} from "../__generated__/graphql";
import Head from "next/head";

import IntroduceBlock from "@/components/IntroduceBlock";
import SEO from "@/components/SEO";
import {DefaultSeo} from "next-seo";
import defaultSEO from "../next-seo.config";
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
        seo={props.data?.page?.translation?.pagesSetting}
        defaultSEO={siteSetting?.siteSetting}
        // uri={props.data?.page?.translation?.uri}
        title={props.data?.page?.translation?.title || ""}
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

        pagesSetting {
          ...pagesSetting
        }

        pageBuilder {
        ...PageBuilder
        }
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
