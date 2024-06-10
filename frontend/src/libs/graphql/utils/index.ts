import {gql} from "@/__generated__";
// import {gql} from "@apollo/client";
import siteData from "../../../data/site_data.json";
import {
  LanguageCodeFilterEnum,
  MenuLocationEnum,
} from "@/__generated__/graphql";
import {createApolloClient} from "@faustwp/core/dist/cjs/client";
// import { LanguageCodeEnum } from "@/__generated__/graphql";

export const client = createApolloClient();

export const getFooterButtonLink = async () => {
  return await client.query({
    query: gql(`
    query GetFooterButton {
      contactPage:page(id:"contact",idType:URI)
 {
   ENLink:translation(language:EN)
   {
     uri
   }
     DELink:translation(language:DE)
   {
     uri
   }
  }
}
    `),
  });
};

export const GET_MENUS = gql(`
  query MenuItems($location: MenuLocationEnum!) {
    menuItems(where: {location: $location}) {
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
`);

export async function getPageType(language: LanguageCodeFilterEnum) {
  return await client.query({
    query: gql(`
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
    `),
    variables: {
      language,
    },
  });
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

export async function getPostThumb() {
  return await client.query({
    query: gql(`
    query GetPostsThumb {
      posts(first:100) {
        nodes {
          language {
            code
          }
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
    `),
  });
}

export async function getAllPost() {
  return await client.query({
    //@ts-ignore
    query: gql`
      query GetPosts {
        posts {
          nodes {
            databaseId
            dateGmt
            slug
            link
            language {
              code
            }
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
            pagesSetting {
              title
              description
              canonicalUrl
              socialGraphImage {
                node {
                  sourceUrl
                }
              }
            }
            uri
            DELang: translation(language: DE) {
              uri
              link
            }
            ENLang: translation(language: EN) {
              uri
              link
            }
          }
        }
        siteSettings {
          siteSetting {
            siteTitle
            siteUrl
            description
            openGraphImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `,
  });
}
