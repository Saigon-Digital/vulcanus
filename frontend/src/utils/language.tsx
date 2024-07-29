type Tlang = {
  require: string
  thankyou: string
  letStart: string
  policy: string
  posted: string
  errorFormatEmail: string
  errorFormatPhone: string
  loading: string
  readMore: string
  introduce: string
  error: string
  service: string
  manufacturing: string
  relatedPost: string
  poweredBy: string
  contactUs: string
  allowAll: string
  loadMore: string
  followUs: string
  location: string
  cookieContent: string
  copyRight: string
  contactInfo: string
  blogDescription: string
  firstName: { label: string; placeholder: string }
  lastName: { label: string; placeholder: string }
  email: { label: string; placeholder: string }
  phone: { label: string; placeholder: string }
  message: { label: string; placeholder: string }
  notFound: { title: string; description: string; btnText: string }
}

type Tlangs = {
  key: string
  value: Tlang
}[]
export const languages = (locale?: string | undefined): Tlang | undefined => {
  if (!locale) return undefined
  const langs: Tlangs = [
    {
      key: "en",
      value: {
        readMore: "Read More",
        location: "Location",

        contactInfo: "Contact Information",
        loading: "...Loading",
        posted: "Posted on",
        followUs: "Follow us on Social Media",
        manufacturing: "Manufacturing",
        relatedPost: "Related Post",
        require: "This field is required",
        error: "Something went wrong",
        cookieContent: `
        <h4 >
                      This website uses cookies
                    </h4>
                    <p>
                     We use cookies to personalize content and ads, to provide social media features, 
                     and to analyze our traffic. We also share information about your use of our site with our social media, 
                     advertising and analytics partners. Our partners may combine this information with other information that you've
                      provided to them or that they've collected from your use of their services.
                    </p>
        `,
        service: "Our Services",
        contactUs: "Contact Us",
        policy: "Privacy Policy",
        allowAll: "Allow All",
        blogDescription:
          "Discover the technological prowess behind Vulcanus Company's CNC manufacturing. Learn about their state-of-the-art equipment, their capacity for large-scale productions, and the diverse materials they expertly handle.",
        poweredBy: "Powered by",
        copyRight: " Copyrights $year. All rights reserved.",
        introduce: "Data protection",
        letStart: `<p>Let’s start <strong>to work</strong> </p>`,
        thankyou: "Thank you for submitting the form !",
        errorFormatEmail: "Please enter correct email format",
        errorFormatPhone: "Please enter correct phone number",
        loadMore: "Load More",
        firstName: { label: "First Name", placeholder: "First Name" },
        lastName: { label: "Last Name", placeholder: "Last Name" },
        email: { label: "Email", placeholder: "Your Email" },
        phone: { label: "Phone", placeholder: "Your Telephone Number" },
        message: { label: "Message", placeholder: "Your Message" },
        notFound: {
          title: "Page not found",
          description: "Sorry, we couldn’t find the page you’re looking for.",
          btnText: "Go back home",
        },
      },
    },
    {
      key: "de",
      value: {
        readMore: "Mehr lesen",
        contactInfo: "Kontaktinformationen",
        loading: "Wird geladen",
        location: "Standort",
        posted: "Veröffentlicht am",
        followUs: "Folge uns auf Social Media",
        letStart: "<p> Jetzt <strong> Bewerben</strong> </p>",
        require: "Dieses Feld ist erforderlich",
        contactUs: "kontaktiere uns",
        cookieContent: `
         <h4 className="!text-xl font-bold">
                      Diese Webseite verwendet Cookies
                    </h4>
                    <p className="text-base ">
                      Wir verwenden Cookies, um Inhalte und Anzeigen zu
                      personalisieren, Funktionen für soziale Medien anbieten zu
                      können und die Zugriffe auf unsere Website zu analysieren.
                      Außerdem geben wir Informationen zu Ihrer Verwendung
                      unserer Website an unsere Partner für soziale Medien,
                      Werbung und Analysen weiter. Unsere Partner führen diese
                      Informationen möglicherweise mit weiteren Daten zusammen,
                      die Sie ihnen bereitgestellt haben oder die sie im Rahmen
                      Ihrer Nutzung der Dienste gesammelt haben.
                    </p>
        
        `,
        manufacturing: "Herstellung",
        service: "Unsere Dienstleistungen",
        policy: "Datenschutzrichtlinie",
        relatedPost: "Verwandter Beitrag",
        introduce: "Datenschutzerklärung",
        poweredBy: "Angetrieben von",
        allowAll: "Alle Zulassen",
        blogDescription:
          "Entdecken Sie die technologische Leistungsfähigkeit hinter der CNC-Fertigung der Vulcanus Company. Erfahren Sie mehr über ihre hochmoderne Ausrüstung, ihre Kapazität für Großproduktionen und die vielfältigen Materialien, mit denen sie fachmännisch umgehen.",
        copyRight: "Copyrights $year. All rights reserved.",
        error: "Etwas ist schief gelaufen",
        thankyou: "Vielen Dank für das Absenden des Formulars!",
        errorFormatEmail: "Bitte geben Sie das korrekte E-Mail-Format ein",
        errorFormatPhone: "Bitte geben Sie die richtige Telefonnummer ein",
        loadMore: "Mehr laden",
        firstName: { label: "Vorname", placeholder: "Ihr Vorname" },
        lastName: { label: "Nachname", placeholder: "Ihr Nachname" },
        phone: { label: "Telefon", placeholder: "Ihre Telefonnummer" },
        email: { label: "Email", placeholder: "Ihre E-Mail" },
        message: { label: "Nachricht", placeholder: "Ihre Nachricht" },
        notFound: {
          title: "Seite nicht gefunden",
          description:
            "Leider konnten wir die von Ihnen gesuchte Seite nicht finden.",
          btnText: "Gehen Sie zur Startseite",
        },
      },
    },
  ]

  return langs.find((ele) => ele.key === locale)?.value || undefined
}
