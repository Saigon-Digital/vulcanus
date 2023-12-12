import {getGlobalSiteData} from "@/libs/graphql/utils";
import {WordPressTemplateProps} from "@/types";
import {WordPressTemplate, getWordPressProps} from "@faustwp/core";
import {GetStaticPaths, GetStaticProps} from "next";
export default function Page(props: WordPressTemplateProps) {
  return <WordPressTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {headerMenu} = await getGlobalSiteData(ctx?.locale);
  return getWordPressProps({
    ctx,
    props: {
      headerMenu,
    },
  });
};

export const getStaticPaths: GetStaticPaths = (ctx) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
