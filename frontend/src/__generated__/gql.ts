/* eslint-disable */
import * as types from "./graphql";
import {TypedDocumentNode as DocumentNode} from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "fragment AcfLink on AcfLink {\n  title\n  url\n  target\n}":
    types.AcfLinkFragmentDoc,
  "fragment BlockSettings on BaseBlockFieldsBlockSettings {\n  spacing {\n    mobile {\n      top\n      bottom\n    }\n    desktop {\n      top\n      bottom\n    }\n  }\n  visibility {\n    showOnMobile\n    showOnDesktop\n  }\n}":
    types.BlockSettingsFragmentDoc,
  "fragment CardsBlock on CardsBlock_Fields {\n  __typename\n  title\n  cards {\n    title\n    description\n  }\n  blockSettings {\n    ...BlockSettings\n  }\n}":
    types.CardsBlockFragmentDoc,
  "fragment HeroBlock on Hero_Fields {\n  title\n  description\n  button {\n    ...AcfLink\n  }\n  blockSettings {\n    ...BlockSettings\n  }\n}":
    types.HeroBlockFragmentDoc,
  "fragment PageBuilder on PageBuilder {\n  dynamicBlocks {\n    ...HeroBlock\n    ...CardsBlock\n  }\n}":
    types.PageBuilderFragmentDoc,
  "query GetContentPage($databaseId: ID!, $asPreview: Boolean = false) {\n        page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {\n            title\n            content\n        }\n        generalSettings {\n            title\n            description\n        }\n        primaryMenuItems: menuItems(where: { location: PRIMARY }) {\n            nodes {\n            id\n            uri\n            path\n            label\n            parentId\n            cssClasses\n            menu {\n                node {\n                name\n                }\n            }\n            }\n        }\n        }\n    ":
    types.GetContentPageDocument,
  "\n  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {\n    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {\n      title\n      content\n      pageBuilder {\n        ...PageBuilder\n      }\n    }\n  }\n":
    types.GetPageDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "fragment AcfLink on AcfLink {\n  title\n  url\n  target\n}"
): (typeof documents)["fragment AcfLink on AcfLink {\n  title\n  url\n  target\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "fragment BlockSettings on BaseBlockFieldsBlockSettings {\n  spacing {\n    mobile {\n      top\n      bottom\n    }\n    desktop {\n      top\n      bottom\n    }\n  }\n  visibility {\n    showOnMobile\n    showOnDesktop\n  }\n}"
): (typeof documents)["fragment BlockSettings on BaseBlockFieldsBlockSettings {\n  spacing {\n    mobile {\n      top\n      bottom\n    }\n    desktop {\n      top\n      bottom\n    }\n  }\n  visibility {\n    showOnMobile\n    showOnDesktop\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "fragment CardsBlock on CardsBlock_Fields {\n  __typename\n  title\n  cards {\n    title\n    description\n  }\n  blockSettings {\n    ...BlockSettings\n  }\n}"
): (typeof documents)["fragment CardsBlock on CardsBlock_Fields {\n  __typename\n  title\n  cards {\n    title\n    description\n  }\n  blockSettings {\n    ...BlockSettings\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "fragment HeroBlock on Hero_Fields {\n  title\n  description\n  button {\n    ...AcfLink\n  }\n  blockSettings {\n    ...BlockSettings\n  }\n}"
): (typeof documents)["fragment HeroBlock on Hero_Fields {\n  title\n  description\n  button {\n    ...AcfLink\n  }\n  blockSettings {\n    ...BlockSettings\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "fragment PageBuilder on PageBuilder {\n  dynamicBlocks {\n    ...HeroBlock\n    ...CardsBlock\n  }\n}"
): (typeof documents)["fragment PageBuilder on PageBuilder {\n  dynamicBlocks {\n    ...HeroBlock\n    ...CardsBlock\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query GetContentPage($databaseId: ID!, $asPreview: Boolean = false) {\n        page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {\n            title\n            content\n        }\n        generalSettings {\n            title\n            description\n        }\n        primaryMenuItems: menuItems(where: { location: PRIMARY }) {\n            nodes {\n            id\n            uri\n            path\n            label\n            parentId\n            cssClasses\n            menu {\n                node {\n                name\n                }\n            }\n            }\n        }\n        }\n    "
): (typeof documents)["query GetContentPage($databaseId: ID!, $asPreview: Boolean = false) {\n        page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {\n            title\n            content\n        }\n        generalSettings {\n            title\n            description\n        }\n        primaryMenuItems: menuItems(where: { location: PRIMARY }) {\n            nodes {\n            id\n            uri\n            path\n            label\n            parentId\n            cssClasses\n            menu {\n                node {\n                name\n                }\n            }\n            }\n        }\n        }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {\n    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {\n      title\n      content\n      pageBuilder {\n        ...PageBuilder\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {\n    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {\n      title\n      content\n      pageBuilder {\n        ...PageBuilder\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
