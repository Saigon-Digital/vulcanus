type Tlang = {
  require: string;
  thankyou: string;
  errorFormatEmail: string;
  errorFormatPhone: string;
  loading: string;
  error: string;
  contactUs: string;
  loadMore: string;
  contactInfo: string;
  firstName: {label: string; placeholder: string};
  lastName: {label: string; placeholder: string};
  email: {label: string; placeholder: string};
  phone: {label: string; placeholder: string};
  message: {label: string; placeholder: string};
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
        contactInfo: "Contact Information",
        loading: "...Loading",
        require: "This field is required",
        error: "Something went wrong",
        contactUs: "Contact Us",
        thankyou: "Thank you for submitting the form !",
        errorFormatEmail: "Please enter correct email format",
        errorFormatPhone: "Please enter correct phone number",
        loadMore: "Load More",
        firstName: {label: "First Name", placeholder: "Your First Name"},
        lastName: {label: "Last Name", placeholder: "Your Last Name"},
        email: {label: "Email", placeholder: "Your Email"},
        phone: {label: "Phone", placeholder: "Your Telephone Number"},
        message: {label: "Message", placeholder: "Your Message"},
      },
    },
    {
      key: "de",
      value: {
        contactInfo: "Kontaktinformationen",
        loading: "Wird geladen",
        require: "Dieses Feld ist erforderlich",
        contactUs: "kontaktiere uns",
        error: "Etwas ist schief gelaufen",
        thankyou: "Vielen Dank für das Absenden des Formulars!",
        errorFormatEmail: "Bitte geben Sie das korrekte E-Mail-Format ein",
        errorFormatPhone: "Bitte geben Sie die richtige Telefonnummer ein",
        loadMore: "Mehr laden",
        firstName: {label: "Vorname", placeholder: "Ihr Vorname"},
        lastName: {label: "Nachname", placeholder: "Ihr Nachname"},
        phone: {label: "Telefon", placeholder: "Deine Telefonnummer"},
        email: {label: "Email", placeholder: "deine E-Mail"},
        message: {label: "Nachricht", placeholder: "Ihre Nachricht"},
      },
    },
  ];

  return langs.find((ele) => ele.key === locale)?.value || undefined;
};
