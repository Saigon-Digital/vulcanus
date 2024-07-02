import {
  EmailField,
  NameField,
  PhoneField,
  TextAreaField,
  FormFragment as TFormFragment,
} from "@/__generated__/graphql";
import React, {
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {PhoneIcon, MailIcon, LocationIcon} from "../Icons";

import Button from "../Button";
import {useQuery, useMutation} from "@apollo/client";
import {GET_FORM, SUBMIT_FORM} from "@/libs/graphql/utils";
import formData from "@/data/form_data.json";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";

import {getMutationVariables} from "@/utils/gravity-form";

import Loader from "../Loader";
import {languages} from "@/utils/language";
import Link from "next/link";
import {useLocaleContext} from "@/context/LocaleContext";
import {allLowercase} from "@/utils";
import {useRouter} from "next/router";
import {useMediaQuery} from "@/hooks/useMediaQuery";
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
  email:
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  phone: /^(\+[1-9]{1}[0-9]{3,14})?([0-9]{9,14})$/,
};

export type TForm = (typeof formData)["gfForm"];
const Form = ({contacts, form}: TFormFragment) => {
  let [gfForm, setGfFrom] = useState<(typeof formData)["gfForm"] | null>(null);

  const {locale, asPath} = useLocaleContext();

  // useState
  const [formSuccess, setFormSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  //------------

  // useRef

  //
  const {
    register,

    reset,
    handleSubmit,
    setError,
    setValue,
    formState: {errors},
  } = useForm();
  //-----------------
  const EXCLUDE_EMAIL = [".email@domain.com", ".email@.domain.com"];

  //#region handle scroll
  const ref = useRef<HTMLFormElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1080px)");
  const router = useRouter();
  const scrollTo = (element: RefObject<HTMLFormElement>) => {
    if (typeof document === undefined || typeof window === undefined) return;

    if (element.current) {
      const top =
        element?.current?.getBoundingClientRect().top +
        window.pageYOffset -
        (isDesktop ? 250 : 100);

      window.scrollTo({top: top, behavior: "smooth"});
    }
  };

  useEffect(() => {
    if (router.asPath && gfForm) {
      console.log("as path ", router.asPath);

      const pSplit = router.asPath.split("#");
      let id = pSplit.at(pSplit.length - 1)?.toLowerCase();
      // console.log(pSplit);
      var fixedstring;

      id = allLowercase(id || "");
      console.log("id ", id);

      if (id === "form") {
        if (ref) scrollTo(ref);
      }
    }
  }, [gfForm]);

  //#region submit
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

  useEffect(() => {
    if (!gfForm) setGfFrom(formData.gfForm);
  }, []);
  // console.log("form error ", error);

  // console.log("number", watch());

  // return;

  // handle submit
  const handleSumit: SubmitHandler<FieldValues> = async (data) => {
    if (!gfForm) return;
    const variables = getMutationVariables({
      databaseId: FORM_ID.toString(),
      fields: gfForm,
      data: data,
    });
    if (Object.entries(errors).length > 0) return;
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

  // console.log("errors ", errors);

  return (
    <div id="form" className="container-fluid py-20 pb-28 xl:py-28 xl:pb-40">
      <div className="grid grid-cols-12 ">
        <div className="col-span-full grid grid-cols-8 gap-y-14 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3">
          <div className=" col-span-full flex flex-col gap-5 md:col-span-3">
            {
              //#region contact info
            }
            {contacts?.map((e, id) => {
              const contactInformation = e?.contactInformation;
              return (
                <>
                  {contactInformation?.title && (
                    <p className="mb-3 mt-4 max-w-[33%] whitespace-nowrap text-2xl font-semibold">
                      {contactInformation?.title} :
                    </p>
                  )}
                  <div key={id} className="  flex flex-col gap-4 ">
                    <p className="flex gap-4">
                      <PhoneIcon />
                      <Link
                        target="_blank"
                        href={`tel:${contactInformation?.phoneNumber || ""}`}
                        className="font-base hover:text-primary-blue-main">
                        {contactInformation?.phoneNumber}
                      </Link>
                    </p>
                    <p className="flex gap-4">
                      <MailIcon />
                      <Link
                        target="_blank"
                        href={`mailto:${contactInformation?.email}`}
                        className="font-base underline hover:text-primary-blue-main">
                        {contactInformation?.email}
                      </Link>
                    </p>
                    {contactInformation?.location?.locationInformation && (
                      <p className="flex gap-4">
                        <LocationIcon />
                        <Link
                          target="_blank"
                          href={
                            (contactInformation?.location
                              ?.locationLink as string) || "#"
                          }
                          className="font-base max-w-[250px] hover:text-primary-blue-main">
                          <span
                            dangerouslySetInnerHTML={{
                              __html:
                                contactInformation?.location
                                  ?.locationInformation,
                            }}></span>
                        </Link>
                      </p>
                    )}
                  </div>
                </>
              );
            })}
          </div>
          <div className="col-span-full mt-10 flex flex-col gap-6 md:mt-0 lg:col-span-5">
            {form?.formTitle && (
              <h2
                dangerouslySetInnerHTML={{__html: form.formTitle}}
                className="max-w-[750px] text-3xl text-primary-blue-main [&>*]:text-3xl  [&>*]:font-semibold xl:[&>*]:text-[32px] xl:[&>*]:leading-[40px]"></h2>
            )}
            {form?.copyrightText && (
              <div
                dangerouslySetInnerHTML={{__html: form.copyrightText}}
                className="[&>*>a]:text-primary-blue-main [&>*>a]:underline [&>*>a]:hover:text-primary-midBlue-main xl:[&>*]:text-lg xl:[&>*]:leading-[24px]"></div>
            )}
            <hr className="h-[1px] w-full border-[0.5px]  border-b-white" />
            {
              //#region form
            }
            <form
              ref={ref}
              onSubmit={handleSubmit(handleSumit)}
              className="grid grid-cols-2 gap-3 gap-y-6 md:gap-4 lg:gap-8">
              {gfForm &&
                gfForm.formFields?.nodes.map((ele, index: number) => {
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
                          placeholder={languages(locale)?.firstName.placeholder}
                          className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                        />
                        {errors[String(ele.databaseId)] && (
                          <p className="absolute -bottom-[28px] left-0 whitespace-nowrap text-sm text-red-400 ">
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
                          placeholder={languages(locale)?.lastName.placeholder}
                          className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                        />
                        {errors[String(ele.databaseId)] && (
                          <p className="absolute -bottom-[28px] left-0 whitespace-nowrap text-sm text-red-400 ">
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
                          placeholder={languages(locale)?.email.placeholder}
                          className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                        />
                        {errors[String(ele.databaseId)] && (
                          <p className="absolute -bottom-[28px] left-0 whitespace-nowrap text-sm text-red-400 ">
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
                            required: {
                              value: ele.isRequired || false,
                              message: languages(locale)?.require || "",
                            },
                            pattern: {
                              value: pattern.phone,
                              message:
                                languages(locale)?.errorFormatPhone || "",
                            },
                          })}
                          type="text"
                          id="phone"
                          placeholder={languages(locale)?.phone.placeholder}
                          className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                        />
                        {errors[String(ele.databaseId)] && (
                          <p className="absolute -bottom-[28px] left-0 whitespace-nowrap text-sm text-red-400 ">
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
                          <p className="absolute -bottom-[28px] left-0 whitespace-nowrap text-sm text-red-400 ">
                            {errors[
                              String(ele.databaseId)
                            ]?.message?.toString()}
                          </p>
                        )}
                      </div>
                    );
                })}{" "}
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
