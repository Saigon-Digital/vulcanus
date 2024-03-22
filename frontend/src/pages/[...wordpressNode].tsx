import {Footer, Header, MenuItemsQuery} from "@/__generated__/graphql";
import Layout from "@/components/Layout";
import {getGlobalSiteData} from "@/libs/graphql/utils";
import {WordPressTemplateProps} from "@/types";
import {WordPressTemplate, getWordPressProps} from "@faustwp/core";
import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from "next/router";

export default function Page(
  props: WordPressTemplateProps & {
    headerMenu: MenuItemsQuery;
    footerMenu: MenuItemsQuery;
  }
) {
  const router = useRouter();
  return (
    <Layout
      headerMenu={props?.headerMenu}
      footerMenu={props?.footerMenu}
      key={`${router.asPath}-${router.locale}`}>
      <WordPressTemplate {...props} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {headerMenu, footerMenu} = await getGlobalSiteData(ctx?.locale);
  return getWordPressProps({
    ctx,
    props: {
      headerMenu,
      footerMenu,
    },
  });
};

export const getStaticPaths: GetStaticPaths = (ctx) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
