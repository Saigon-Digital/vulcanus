import {WordPressTemplateProps} from "@/types";
import {WordPressTemplate, getWordPressProps} from "@faustwp/core";
import {GetStaticProps} from "next";
export default function Page(props: WordPressTemplateProps) {
  return <WordPressTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return getWordPressProps({
    ctx,
  });
};
