import {gql} from "@/__generated__";
import {GetContentPageQuery} from "@/__generated__/graphql";
import {FaustTemplate} from "@faustwp/core";
import parse from "html-react-parser";
import React from "react";

const ContentPage: FaustTemplate<GetContentPageQuery> = (props) => {
  return (
    <article className="container prose [&_*]:text-white">
      {parse(props?.data?.page?.content || "")}
    </article>
  );
};

ContentPage.variables = ({databaseId}, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

ContentPage.query = gql(
  `query GetContentPage($databaseId: ID!, $asPreview: Boolean = false) {
        page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
            title
            content
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
    `
);

export default ContentPage;
