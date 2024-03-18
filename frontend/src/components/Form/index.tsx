import {Form as TForm} from "@/__generated__/graphql";
import React from "react";
import {PhoneIcon, MailIcon, LocationIcon} from "../Icons";
import parse from "html-react-parser";
import Button from "../Button";
const Form = ({contactInformation, form}: TForm) => {
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
            <form action="" className="grid grid-cols-2 gap-6">
              <div className="col-span-1 flex flex-col gap-4">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Your first name"
                  className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                />
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Your last name"
                  className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                />
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                <label htmlFor="email">E-mail</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Your email"
                  className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                />
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Your phone number"
                  className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                />
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <label htmlFor="message">Message</label>
                <textarea
                  rows={4}
                  aria-rowspan={4}
                  id="message"
                  placeholder="Message"
                  className="min-h-[48px] px-3 py-2 text-black placeholder:text-black/30"
                />
              </div>
              <div className="col-span-1  gap-4">
                <Button type="submit" as="button" className="mt-3">
                  Contact us
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
