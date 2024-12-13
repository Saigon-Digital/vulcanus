import BlockViewer from "@/wp-blocks/BlockViewer"
import {FaustTemplate} from "@faustwp/core"
import {useRouter} from "next/router"
import {gql} from "../__generated__"
import {GetPageQuery, LanguageCodeEnum} from "../__generated__/graphql"
import Head from "next/head"

import IntroduceBlock from "@/components/IntroduceBlock"
import SEO from "@/components/SEO"

const Page: FaustTemplate<GetPageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const dynamicBlocks = props.data?.page?.isPreview
    ? props.data?.page?.pageBuilder?.dynamicBlocks
    : props?.data?.page?.translation?.pageBuilder?.dynamicBlocks || []

  // const language = props.__TEMPLATE_VARIABLES__?.language;

  // const pathname = props.data?.page?.translation?.uri;
  const siteSetting = props.data?.siteSettings
  let siteTitle = props.data?.page?.title + " | Vulcanus Stahl"
  let socialLink =
    process.env.NEXT_PUBLIC_SITE_URL +
    (props?.data?.page?.translation?.uri ?? "")
  // console.log(socialLink)

  return (
    <>
      <SEO
        DEUri={props?.data?.page?.translation?.DELang?.link}
        ENUri={props.data?.page?.translation?.ENLang?.link}
        seo={props?.data?.page?.translation?.pagesSetting}
        defaultSEO={{...siteSetting?.siteSetting, siteTitle: siteTitle}}
        link={socialLink}
      />

      <BlockViewer dynamicBlocks={dynamicBlocks} />
    </>
  )
}
//triger preview
Page.variables = ({databaseId}, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    language: ctx?.locale === "en" ? LanguageCodeEnum.En : LanguageCodeEnum.De,
  }
}

Page.query = gql(`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false, $language: LanguageCodeEnum!) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {

      uri
      title
      content
      slug
      isPreview
     
      language {
        code
      }

      pagesSetting @include(if:$asPreview) {
        ...pagesSetting
      }

      pageBuilder @include(if:$asPreview) {
      ...PageBuilder

      }
      translation(language: $language) {
        uri
        title
        content
        slug
        link
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
          link
        }
        DELang:translation(language: DE) {
          uri
          link
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
`)

export default Page
