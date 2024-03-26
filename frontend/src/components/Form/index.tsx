import {
  EmailField,
  GetContentPageQuery,
  LanguageCodeEnum,
  NameField,
  PhoneField,
  TextAreaField,
  Form as TForm,
} from "@/__generated__/graphql";
import React, {useEffect, useRef, useState} from "react";
import {PhoneIcon, MailIcon, LocationIcon} from "../Icons";
import parse from "html-react-parser";
import Button from "../Button";
import {useQuery, useMutation} from "@apollo/client";
import {GET_FORM, SUBMIT_FORM} from "@/libs/graphql/utils";
import {GetGravityFormQuery} from "@/__generated__/graphql";
import {FieldValue, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {log} from "console";
import {getMutationVariables} from "@/utils/gravity-form";
import {useRouter} from "next/router";
import Loader from "../Loader";
import {languages} from "@/utils/language";
import Link from "next/link";
const FORM_ID = 1;
const DELAY = 5000;
enum adminLabelEmun {
  firstName = "First Name",
  lastName = "Last Name",
  text = "Text",
  email = "Email",
  message = "Message",
  phone = "Phone",
}
const pattern = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/,
  // phone:
  //   /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/,
  phone: /^(\+[1-9]{1}[0-9]{3,14})?([0-9]{9,14})$/,
};

type inputField = EmailField | NameField | TextAreaField | PhoneField;
const Form = ({contactInformation, form}: TForm) => {
  let gfForm: any;
  const {data, error} = useQuery(GET_FORM, {
    variables: {formId: String(FORM_ID)},
  });
  const locale = useRouter().locale;

  // useState
  const [formSuccess, setFormSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  //------------

  // useRef
  const phoneRef = useRef<HTMLInputElement>(null);
  //
  const {
    register,
    watch,
    reset,
    handleSubmit,
    setError,
    setValue,
    formState: {errors},
  } = useForm();
  //-----------------

  // use Mutation
  const [submitFormMutation, {loading: submitFormLoading}] = useMutation(
    SUBMIT_FORM,
    {
      onCompleted(data) {
        if (data?.submitGfForm?.errors?.length) {
          data?.submitGfForm?.errors?.forEach((error: any) => {
            setError(String(error?.id), {
              type: "manual",
              message: error?.message,
            });
          });
        }
        if (!data?.submitGfForm?.entry?.dateCreated) {
          return;
        }
        setFormSuccess(true);
        const timeOutId = setTimeout(() => {
          reset();
          setFormSuccess(false);
          clearTimeout(timeOutId);
        }, DELAY);
      },
    }
  );

  /////
  if (!data || error)
    return (
      <div className="container-fluid min-h-[600px] py-20 pb-28 text-lg xl:py-28 xl:pb-40">
        {error ? languages(locale)?.error : languages(locale)?.loading}
      </div>
    );

  gfForm = data.gfForm;
  console.log("form  ", gfForm);
  console.log("form error ", error);

  // console.log("number", watch());

  // return;

  // handle submit
  const handleSumit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const variables = getMutationVariables({
      databaseId: FORM_ID.toString(),
      fields: gfForm,
      data: data,
    });
    console.log("form variable ", variables);

    try {
      setLoading(true);
      await submitFormMutation({
        variables,
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid py-20 pb-28 xl:py-28 xl:pb-40">
      <div className="grid grid-cols-12 ">
        <div className="col-span-full grid grid-cols-8 gap-y-14 lg:col-span-8 lg:col-start-3">
          <div className="col-span-full flex flex-col gap-5 md:col-span-3">
            <h4 className="mb-3 max-w-[33%] text-2xl font-semibold">
              Contact Information:
            </h4>
            <p className="flex gap-4">
              <PhoneIcon />
              <span className="font-base">
                {contactInformation?.phoneNumber}
              </span>
            </p>
            <p className="flex gap-4">
              <MailIcon />
              <Link
                href={`mailto:${contactInformation?.email}`}
                className="font-base underline">
                {contactInformation?.email}
              </Link>
            </p>
            <p className="flex gap-4">
              <LocationIcon />
              <a
                href={
                  (contactInformation?.location?.locationLink as string) || "#"
                }
                className="font-base max-w-[250px]">
                {contactInformation?.location?.locationInformation}
              </a>
            </p>
          </div>
          <div className="col-span-full mt-10 flex flex-col gap-6 md:mt-0 lg:col-span-5">
            <h4 className="max-w-[750px] text-3xl text-primary-blue-main [&>*]:text-3xl  [&>*]:font-semibold xl:[&>*]:text-[32px] xl:[&>*]:leading-[40px]">
              {form?.formTitle && parse(form.formTitle)}
            </h4>
            {form?.copyrightText && (
              <div className="[&>*>a]:text-primary-blue-main [&>*>a]:underline xl:[&>*]:text-lg xl:[&>*]:leading-[24px]">
                {parse(form.copyrightText)}
              </div>
            )}
            <hr className="h-[1px] w-full border-[0.5px]  border-b-white" />
            <form
              onSubmit={handleSubmit(handleSumit)}
              className="grid grid-cols-2 gap-3 gap-y-6 md:gap-4 lg:gap-8">
              {gfForm &&
                gfForm.formFields?.nodes.map(
                  (ele: inputField, index: number) => {
                    if (ele.adminLabel === adminLabelEmun.firstName)
                      return (
                        <div className="relative col-span-full flex flex-col gap-4 sm:col-span-1">
                          <label
                            className="text-lg font-medium leading-[22px]"
                            htmlFor="firstName">
                            {languages(locale)?.firstName.label}
                          </label>
                          <input
                            {...register(String(ele.databaseId), {
                              required: {
                                value: ele.isRequired || false,
                                message: languages(locale)?.require || "",
                              },
                            })}
                            type="text"
                            id="firstName"
                            placeholder={
                              languages(locale)?.firstName.placeholder
                            }
                            className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                          />
                          {errors[String(ele.databaseId)] && (
                            <p className="absolute -bottom-[28px] left-0 text-sm text-red-400 ">
                              {errors[
                                String(ele.databaseId)
                              ]?.message?.toString()}
                            </p>
                          )}
                        </div>
                      );
                    if (ele.adminLabel === adminLabelEmun.lastName)
                      return (
                        <div className="relative col-span-full flex flex-col gap-4 sm:col-span-1">
                          <label
                            className="text-lg font-medium leading-[22px]"
                            htmlFor="lastName">
                            {languages(locale)?.lastName.label}
                          </label>
                          <input
                            {...register(String(ele.databaseId), {
                              required: {
                                value: ele.isRequired || false,
                                message: languages(locale)?.require || "",
                              },
                            })}
                            type="text"
                            id="lastName"
                            placeholder={
                              languages(locale)?.lastName.placeholder
                            }
                            className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                          />
                          {errors[String(ele.databaseId)] && (
                            <p className="absolute -bottom-[28px] left-0 text-sm text-red-400 ">
                              {errors[
                                String(ele.databaseId)
                              ]?.message?.toString()}
                            </p>
                          )}
                        </div>
                      );

                    if (ele.adminLabel === adminLabelEmun.email)
                      return (
                        <div className="relative col-span-full flex flex-col gap-3 sm:col-span-1">
                          <label
                            className="text-lg font-medium leading-[22px]"
                            htmlFor="email">
                            {languages(locale)?.email.label}
                          </label>
                          <input
                            {...register(String(ele.databaseId), {
                              required: {
                                value: ele.isRequired || false,
                                message: languages(locale)?.require || "",
                              },
                              pattern: {
                                value: pattern.email,
                                message:
                                  languages(locale)?.errorFormatEmail || "",
                              },
                            })}
                            type="text"
                            id="email"
                            pattern={String(pattern.email)}
                            placeholder={languages(locale)?.email.placeholder}
                            className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                          />
                          {errors[String(ele.databaseId)] && (
                            <p className="absolute -bottom-[28px] left-0 text-sm text-red-400 ">
                              {errors[
                                String(ele.databaseId)
                              ]?.message?.toString()}
                            </p>
                          )}
                        </div>
                      );
                    if (ele.adminLabel === adminLabelEmun.phone)
                      return (
                        <div className="relative col-span-full flex flex-col gap-3 sm:col-span-1">
                          <label
                            className="text-lg font-medium leading-[22px]"
                            htmlFor="phone">
                            {languages(locale)?.phone.label}
                          </label>
                          <input
                            {...register(String(ele.databaseId), {
                              required: ele.isRequired || false,
                              pattern: {
                                value: pattern.phone,
                                message: "Please enter correct phone number",
                              },
                            })}
                            type="text"
                            id="phone"
                            placeholder={languages(locale)?.phone.placeholder}
                            className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                          />
                          {errors[String(ele.databaseId)] && (
                            <p className="absolute -bottom-[28px] left-0 text-sm text-red-400 ">
                              {errors[
                                String(ele.databaseId)
                              ]?.message?.toString()}
                            </p>
                          )}
                        </div>
                      );
                    if (ele.adminLabel === adminLabelEmun.message)
                      return (
                        <div className="relative col-span-2 flex flex-col gap-3">
                          <label
                            className="text-lg font-medium leading-[22px]"
                            htmlFor="message">
                            {languages(locale)?.message.label}
                          </label>
                          <textarea
                            {...register(String(ele.databaseId), {
                              required: {
                                value: ele.isRequired || false,
                                message: languages(locale)?.require || "",
                              },
                            })}
                            rows={4}
                            aria-rowspan={4}
                            id="message"
                            placeholder={languages(locale)?.message.placeholder}
                            className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                          />
                          {errors[String(ele.databaseId)] && (
                            <p className="absolute -bottom-[28px] left-0 text-sm text-red-400 ">
                              {errors[
                                String(ele.databaseId)
                              ]?.message?.toString()}
                            </p>
                          )}
                        </div>
                      );
                  }
                )}{" "}
              <div className="col-span-1  gap-4">
                {!formSuccess ? (
                  !loading ? (
                    <Button
                      type="submit"
                      as="button"
                      className="mt-3 whitespace-nowrap">
                      {languages(locale)?.contactUs}
                    </Button>
                  ) : (
                    <>
                      <Loader />
                    </>
                  )
                ) : (
                  <p className="whitespace-nowrap text-2xl">
                    {languages(locale)?.thankyou}{" "}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
