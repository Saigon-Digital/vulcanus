// import {gql} from "@/__generated__";
import { gql } from "@apollo/client";

import {LanguageCodeFilterEnum, MenuLocationEnum,LanguageCodeEnum,PostFragmentFragment} from "@/__generated__/graphql";
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
                  uri
                  label
                  title
                  parentId
                  id
                  target
                  childItems {
                    nodes {
                      title
                      uri
                      label
                    }
                  }
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


export const GET_FORM = gql(`
  query GetGravityForm($formId: ID!) {
    gfForm(id: $formId, idType: DATABASE_ID) {
      id
      databaseId
      cssClass
      submitButton {
        text
      }
      confirmations {
        message
      }
      formId: databaseId
      formFields {
        nodes {
          databaseId
          type
          layoutGridColumnSpan
          layoutSpacerGridColumnSpan
          displayOnly
          visibility
          ...EmailField
          ...ConsentField
          ...TextField
          ...TextAreaField
          ...PhoneField
          ...NameField
        }
      }
      

    }
    
  }
  fragment EmailField on EmailField {
    isRequired
    label
    adminLabel
    placeholder
    adminLabel
    hasAutocomplete
  }
  fragment NameField on NameField {
    isRequired
    label
    adminLabel
    
    adminLabel
    hasAutocomplete
  }
  fragment ConsentField on ConsentField {
    isRequired
    adminLabel
    checkboxLabel
 
    errorMessage
  }
  fragment PhoneField on PhoneField {
    isRequired
    adminLabel
    
    label
    placeholder
    hasAutocomplete
    autocompleteAttribute
  }
  fragment TextAreaField on TextAreaField {
    isRequired
    label
    adminLabel
   
    placeholder
    maxLength
  }
  fragment TextField on TextField {
    isRequired
    label
    adminLabel
    
    placeholder
    autocompleteAttribute
    hasAutocomplete
    errorMessage
    maxLength
  }
  
`);

export const SUBMIT_FORM = gql(`
  mutation submitForm($databaseId: ID!, $fieldValues: [FormFieldValuesInput]!) {
    submitGfForm(input: {id: $databaseId, fieldValues: $fieldValues}) {
      errors {
        id
        message
      }
      entry{
        dateCreated
      }
    }
  }
`);

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
