import BlockViewer from "@/wp-blocks/BlockViewer";
import {FaustTemplate} from "@faustwp/core";
import {useRouter} from "next/router";
import {gql} from "../__generated__";
import {GetPageQuery, LanguageCodeEnum} from "../__generated__/graphql";
import Head from "next/head";

const Page: FaustTemplate<GetPageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }
  const dynamicBlocks =
    props?.data?.page?.translation?.pageBuilder?.dynamicBlocks || [];
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
        title
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
