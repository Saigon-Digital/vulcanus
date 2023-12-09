import {WordPressTemplate} from "@faustwp/core";

export type WordPressTemplateProps = Parameters<
  typeof WordPressTemplate
>[number];

type Spacing = {
  top?: number;
  bottom?: number;
};
