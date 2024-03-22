type Tlang = {
  require: string;
  thankyou: string;
  errorFormatEmail: string;
  errorFormatPhone: string;
  loading: string;
  contactUs: string;
  loadMore: string;
};

type Tlangs = {
  key: string;
  value: Tlang;
}[];
export const languages = (locale: string | undefined): Tlang | undefined => {
  if (!locale) return undefined;
  const langs: Tlangs = [
    {
      key: "en",
      value: {
        loading: "...Loading",
        require: "This field is require",
        contactUs: "Contact Us",
        thankyou: "Thank you for submitting the form !",
        errorFormatEmail: "Please enter correct email format",
        errorFormatPhone: "Please enter correct phone number",
        loadMore: "Load More",
      },
    },
    {
      key: "de",
      value: {
        loading: "Wird geladen",
        require: "Dieses Feld ist erforderlich",
        contactUs: "kontaktiere uns",
        thankyou: "Vielen Dank für das Absenden des Formulars!",
        errorFormatEmail: "Bitte geben Sie das korrekte E-Mail-Format ein",
        errorFormatPhone: "Bitte geben Sie die richtige Telefonnummer ein",
        loadMore: "Mehr laden",
      },
    },
  ];

  return langs.find((ele) => ele.key === locale)?.value || undefined;
};
