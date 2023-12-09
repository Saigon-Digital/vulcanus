import {FaustTemplate} from "@faustwp/core";
import {gql} from "../__generated__";
import {GetPageQuery} from "../__generated__/graphql";
import BlockViewer from "@/wp-blocks/BlockViewer";
import {Block} from "@/wp-blocks";

const Page: FaustTemplate<GetPageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }
  const dynamicBlocks = props?.data?.page?.pageBuilder?.dynamicBlocks;
  return (
    <>
      <BlockViewer dynamicBlocks={dynamicBlocks} />
    </>
  );
};

Page.variables = ({databaseId}, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

Page.query = gql(`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      pageBuilder {
        ...PageBuilder
      }
    }
  }
`);

export default Page;
