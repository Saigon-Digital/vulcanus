import BlockViewer from "@/wp-blocks/BlockViewer";
import {FaustTemplate} from "@faustwp/core";
import {useRouter} from "next/router";
import {gql} from "../__generated__";
import {GetPageQuery, LanguageCodeEnum} from "../__generated__/graphql";
import Head from "next/head";
import {INTRODUCE_PAGE} from "@/constant";
import IntroduceBlock from "@/components/IntroduceBlock";

const Page: FaustTemplate<GetPageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }
  console.log(props);

  const dynamicBlocks =
    props?.data?.page?.translation?.pageBuilder?.dynamicBlocks || [];

  const language = props.__TEMPLATE_VARIABLES__?.language;

  const pathname = props.data?.page?.translation?.uri;
  const introducePage =
    props.data?.page?.translation?.pageType?.nodes.findIndex(
      (ele) => ele.name === INTRODUCE_PAGE
    ) !== -1;
  if (introducePage)
    return (
      <>
        <Head>
          <title>{props?.data?.page?.translation?.title}</title>
        </Head>
        <main>
          <IntroduceBlock
            pathname={pathname || ""}
            language={language}
            content={props.data?.page?.translation?.content}
          />
        </main>
      </>
    );
  return (
    <>
      <Head>
        <title>{props?.data?.page?.translation?.title}</title>
      </Head>
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
        pageBuilder {
        ...PageBuilder
        }
      }
    }
  }
`);

export default Page;
