// import {gql} from "@/__generated__";
import { gql } from "@apollo/client";
import {LanguageCodeFilterEnum, MenuLocationEnum,LanguageCodeEnum} from "@/__generated__/graphql";
import {createApolloClient} from "@faustwp/core/dist/cjs/client";
// import { LanguageCodeEnum } from "@/__generated__/graphql";
const menuLocations = {
  de: {
    header: MenuLocationEnum.Header,
    footer: MenuLocationEnum.Footer,
  },
  en: {
    header: MenuLocationEnum.HeaderEn,
    footer: MenuLocationEnum.FooterEn,
  },
};


const client = createApolloClient();

async function getMenuItems(location: MenuLocationEnum) {
  return await client.query({
    query: gql(`
            query MenuItems($location: MenuLocationEnum!) {
              menuItems(where: { location: $location }) {
                nodes {
                  label
                  target
                  uri
                }
              }
            }
          `),
    variables: {
      location,
    },
  });
}

export async function getPageType (language: LanguageCodeEnum) {
  return await client.query({
    query:gql(`
    query GetPageType($language:LanguageCodeFilterEnum!) {
      pages(where: {language: $language}) {
        nodes {
          uri
          pageType {
            nodes {
              name
            }
          }
          title
          slug
          
        }
      }
    }
    `),variables:{
      language
    }
  })
}

export async function getPostThumb (language:LanguageCodeFilterEnum) {
  return await client.query({
    query:gql`
    query GetPostsThumb($language:LanguageCodeFilterEnum!) {
      posts (where: {language: $language}) {
        nodes {
          featuredImage {
            node {
              sourceUrl
            }
          }
          title
          slug
          blogDescription {
            blogDescription
          }
        }
      }
    }
    `,
    variables:{
      language:language.toLocaleUpperCase()
    }
  },)
}

export async function getAllPost () {
  return await client.query({
    //@ts-ignore
    query:gql`
    query GetPosts {
      posts {
        nodes {
        slug
        author {
          node {
           
            avatar {
              url
            }
            name
            registeredDate
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        content
        title
      }
    }
  }
    
    `,
   
  }) 
}


export async function getGlobalSiteData(locale: string | undefined) {
  const menuLocation = menuLocations[(locale as "de" | "en") || "de"];
  const headerMenu = await getMenuItems(menuLocation.header);
  const footerMenu = await getMenuItems(menuLocation.footer);

  return {
    headerMenu: headerMenu.data,
    footerMenu: footerMenu.data,
  };
}
