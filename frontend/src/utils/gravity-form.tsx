import {
  FormFieldTypeEnum,
  FormFieldValuesInput,
  GetGravityFormQuery,
} from "@/__generated__/graphql";
import {FieldValues} from "react-hook-form";
import {SubmitFormMutationVariables} from "@/__generated__/graphql";
import {TForm} from "@/components/Form";
export const getMutationVariables = ({
  databaseId,
  fields,
  data,
}: {
  databaseId: string;
  fields: TForm;
  data: FieldValues;
}): SubmitFormMutationVariables => {
  // Reference: https://github.com/AxeWP/wp-graphql-gravity-forms/blob/develop/docs/submitting-forms.md#consentNote
  let fieldValues: FormFieldValuesInput[] = [];
  fields?.formFields?.nodes.forEach((field) => {
    const value = data[field.databaseId];
    const {type} = field;

    if (
      [
        FormFieldTypeEnum.Date,
        FormFieldTypeEnum.Text,
        FormFieldTypeEnum.Textarea,
        FormFieldTypeEnum.Phone,
        FormFieldTypeEnum.Radio,
        FormFieldTypeEnum.Select,
        FormFieldTypeEnum.Time,
        FormFieldTypeEnum.Website,
        //@ts-ignore
      ].includes(type)
    ) {
      fieldValues.push({
        id: field.databaseId,
        value,
      });
    }
    if (type === FormFieldTypeEnum.Email) {
      fieldValues.push({
        id: field.databaseId,
        emailValues: {value},
      });
    }
    if (type === FormFieldTypeEnum.Consent) {
      fieldValues.push({
        id: field.databaseId,
        value: Boolean(value) ? "yes" : "",
      });
    }
    if (type === FormFieldTypeEnum.Name) {
      fieldValues.push({
        id: field.databaseId,
        nameValues: {
          first: value.first,
          last: value.last,
        },
      });
    }
  });
  return {
    databaseId,
    fieldValues:
      fields?.formFields?.nodes.length === 1 ? fieldValues?.[0] : fieldValues,
  };
};
