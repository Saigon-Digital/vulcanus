import {gql} from "@/__generated__";
import {GetContentPageQuery, LanguageCodeEnum} from "@/__generated__/graphql";
import IntroduceBlock from "@/components/IntroduceBlock";
import {FaustTemplate} from "@faustwp/core";

import Head from "next/head";
import {useRouter} from "next/router";
import React from "react";

const ContentPage: FaustTemplate<GetContentPageQuery> = (props) => {
  const {locale} = useRouter();
  const content = props?.data?.page?.translation?.content;

  return (
    <>
      <Head>{props.data?.page?.translation?.title}</Head>
      <article>
        <IntroduceBlock content={props.data?.page?.translation?.content} />
      </article>
    </>
  );
};

ContentPage.variables = ({databaseId}, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    language: ctx?.locale === "en" ? LanguageCodeEnum.En : LanguageCodeEnum.De,
  };
};

ContentPage.query = gql(`
query GetContentPage($databaseId: ID!, $asPreview: Boolean = false, $language: LanguageCodeEnum!) {
        page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
            translation(language: $language) {
                language{
                    code
                }
                title
                content
            }
        }
        generalSettings {
            title
            description
        }
        primaryMenuItems: menuItems(where: { location: PRIMARY }) {
            nodes {
            id
            uri
            path
            label
            parentId
            cssClasses
            menu {
                node {
                name
                }
            }
            }
        }
        }
    `);

export default ContentPage;
