import {gql} from "@apollo/client";

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
