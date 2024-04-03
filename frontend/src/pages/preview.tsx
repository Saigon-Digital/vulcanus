import {getWordPressProps, WordPressTemplate} from "@faustwp/core";
import {WordPressTemplateProps} from "../types";
import {GetStaticProps} from "next";
export default function Preview(props: WordPressTemplateProps) {
  return <WordPressTemplate {...props} />;
}
