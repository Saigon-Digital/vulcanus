import {getGlobalSiteData} from "@/libs/graphql/utils";
import {WordPressTemplateProps} from "@/types";
import {WordPressTemplate, getWordPressProps} from "@faustwp/core";
import {GetStaticProps} from "next";
export default function Page(props: WordPressTemplateProps) {
  return <WordPressTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const {headerMenu, footerMenu} = await getGlobalSiteData(ctx?.locale);
  return getWordPressProps({
    ctx,
  });
};
