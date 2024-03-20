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
  if (!data || error) return <div className="h-[500px]"></div>;

  gfForm = data.gfForm;
  console.log("form  ", errors);
  // console.log("number", watch());

  // return;

  // text message
  const thankyouMsg =
    locale === LanguageCodeEnum.En.toLocaleLowerCase()
      ? "Thank you for submitting the form !"
      : "Vielen Dank für das Absenden des Formulars!";
  //----------//

  // on Invalid
  const onInvalid = (e: any) => {
    if (e.target.id === "phone") {
      phoneRef?.current?.setCustomValidity(
        "Please enter with format: 000-000-0000 "
      );
    }
  };
  //

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
        <div className="col-span-full grid grid-cols-8 lg:col-span-8 lg:col-start-3">
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
              <a
                href={`mailto:${contactInformation?.email}`}
                className="font-base underline">
                {contactInformation?.email}
              </a>
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
            <h4 className="max-w-[630px] text-3xl text-primary-blue-main  [&>*]:text-3xl xl:[&>*]:text-[32px]">
              {form?.formTitle && parse(form.formTitle)}
            </h4>
            {form?.copyrightText && (
              <div className="[&>*>a]:text-primary-blue-400 [&>*>a]:underline">
                {parse(form.copyrightText)}
              </div>
            )}
            <hr className="h-[1px] w-full border-[0.5px] border-b-white" />
            <form
              onSubmit={handleSubmit(handleSumit)}
              className="grid grid-cols-2 gap-6">
              {gfForm &&
                gfForm.formFields?.nodes.map(
                  (ele: inputField, index: number) => {
                    if (ele.adminLabel === adminLabelEmun.firstName)
                      return (
                        <div className="relative col-span-1 flex flex-col gap-4">
                          <label htmlFor="firstName">First name</label>
                          <input
                            {...register(String(ele.databaseId), {
                              required: {
                                value: ele.isRequired || false,
                                message: languages(locale)?.require || "",
                              },
                            })}
                            type="text"
                            id="firstName"
                            placeholder="Your first name"
                            className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                          />
                          {errors[String(ele.databaseId)] && (
                            <p className="absolute -bottom-[25px] left-0 text-sm ">
                              {errors[
                                String(ele.databaseId)
                              ]?.message?.toString()}
                            </p>
                          )}
                        </div>
                      );
                    if (ele.adminLabel === adminLabelEmun.lastName)
                      return (
                        <div className="relative col-span-1 flex flex-col gap-4">
                          <label htmlFor="lastName">Last name</label>
                          <input
                            {...register(String(ele.databaseId), {
                              required: {
                                value: ele.isRequired || false,
                                message: languages(locale)?.require || "",
                              },
                            })}
                            type="text"
                            id="lastName"
                            required={ele.isRequired || false}
                            placeholder="Your last name"
                            className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                          />
                          {errors[String(ele.databaseId)] && (
                            <p className="absolute -bottom-[25px] left-0 text-sm ">
                              {errors[
                                String(ele.databaseId)
                              ]?.message?.toString()}
                            </p>
                          )}
                        </div>
                      );

                    if (ele.adminLabel === adminLabelEmun.email)
                      return (
                        <div className="relative col-span-1 flex flex-col gap-4">
                          <label htmlFor="email">E-mail</label>
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
                            required={ele.isRequired || false}
                            placeholder="Your email"
                            className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                          />
                          {errors[String(ele.databaseId)] && (
                            <p className="absolute -bottom-[25px] left-0 text-sm ">
                              {errors[
                                String(ele.databaseId)
                              ]?.message?.toString()}
                            </p>
                          )}
                        </div>
                      );
                    if (ele.adminLabel === adminLabelEmun.phone)
                      return (
                        <div className="relative col-span-1 flex flex-col gap-4">
                          <label htmlFor="phone">Phone</label>
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
                            //ref={phoneRef}
                            // onInvalid={(e) => onInvalid(e)}
                            // pattern={String(pattern.phone)}
                            required={ele.isRequired || false}
                            placeholder="Your phone number"
                            className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                          />
                          {errors[String(ele.databaseId)] && (
                            <p className="absolute -bottom-[25px] left-0 text-sm ">
                              {errors[
                                String(ele.databaseId)
                              ]?.message?.toString()}
                            </p>
                          )}
                        </div>
                      );
                    if (ele.adminLabel === adminLabelEmun.message)
                      return (
                        <div className="relative col-span-2 flex flex-col gap-4">
                          <label htmlFor="message">Message</label>
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
                            placeholder="Message"
                            className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                          />
                          {errors[String(ele.databaseId)] && (
                            <p className="absolute -bottom-[25px] left-0 text-sm ">
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
                    <Button type="submit" as="button" className="mt-3">
                      Contact us
                    </Button>
                  ) : (
                    <>
                      <Loader />
                    </>
                  )
                ) : (
                  <p className="text-2xl">{languages(locale)?.thankyou} </p>
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
