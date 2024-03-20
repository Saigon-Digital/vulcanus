type Tlang = {
  require: string;
  thankyou: string;
  errorFormatEmail: string;
  errorFormatPhone: string;
};

export const languages = (locale: string | undefined): Tlang | undefined => {
  if (!locale) return undefined;
  const langs = [
    {
      key: "en",
      value: {
        require: "This field is require",
        thankyou: "Thank you for submitting the form !",
        errorFormatEmail: "Please enter correct email format",
        errorFormatPhone: "Please enter correct phone number",
      },
    },
    {
      key: "de",
      value: {
        require: "This field is require",
        thankyou: "Thank you for submitting the form !",
        errorFormatEmail: "Please enter correct email format",
        errorFormatPhone: "Please enter correct phone number",
      },
    },
  ];

  return langs.find((ele) => ele.key === locale)?.value || undefined;
};
