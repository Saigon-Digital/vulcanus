import React from "react"
import Hero from "@/components/Hero"
import BlogsBlock from "@/components/BlogsBlock"

function BlogDePage() {
  const heroProps = {
    title: "CNC, Maschinenbau, Branchen-Blogs & Einblicke",
    backgroundImage: {
      node: {
        altText: "",
        sourceUrl:
          "https://holgerk1.sg-host.com/wp-content/uploads/2024/11/IMG_2658_2-1-min.png",
        sizes: "(max-width: 300px) 100vw, 300px",
        caption: null,
      },
    },
    description:
      "Willkommen im Blog von Vulcanus-Stahl & Maschinenbau GmbH! Hier finden Sie spannende Einblicke in unsere neuesten Projekte, Innovationen in der CNC-Fertigung, und praktische Tipps aus der Welt des Maschinenbaus. Erfahren Sie mehr über unsere Technologien, Erfolge und wie wir unsere Leidenschaft für Präzision täglich in die Tat umsetzen.",
    button: {
      title: "Mehr Über uns",
      url: "https://holgerk1.sg-host.com/unternehmen/",
      target: "",
    },
    blockSettings: {
      spacing: {
        mobile: {
          top: null,
          bottom: null,
        },
        desktop: {
          top: null,
          bottom: null,
        },
      },
      visibility: {
        showOnMobile: true,
        showOnDesktop: true,
      },
    },
  }
  const blogMockData = {
    fieldGroupName: "PageBuilderDynamicBlocksBlogsLayout",
    tittle: null,
    ctaBlocks: [
      {
        title: "Kontakt ",
        ctaButton: {
          fieldGroupName: "BlogsCtaBlocksCtaButton",
          text: "Kontaktiere uns",
          link: {
            title: "Kontakt",
            url: "https://vulcanus-stahl.netlify.app/kontakt#form",
            target: "",
          },
        },
        contactInfo:
          "<p>Wir sind Ihr Partner für die CNC-Fertigung von Einzelteilen und Serien, Sonderkonstruktionen und Reparaturarbeiten.</p>\n",
      },
      {
        title: "Jetzt Deinen Ausbildungsplatz sichern ",
        ctaButton: {
          fieldGroupName: "BlogsCtaBlocksCtaButton",
          text: "arbeite mit uns",
          link: {
            title: "Jetzt Bewerben",
            url: "https://vulcanus-stahl.netlify.app/kontakt#form",
            target: "",
          },
        },
        contactInfo:
          '<p>Bitte bewerben Sie sich schriftlich, vorzugsweise per E-Mail, an: <a href="mailto:bewerbung@vulcanus-stahl.de" target="_blank" rel="noopener">bewerbung@vulcanus-stahl.de</a> Wir freuen uns auf Ihre Bewerbungen.</p>\n',
      },
    ],
  }
  return (
    <div>
      <Hero {...heroProps} />
      <BlogsBlock {...blogMockData} />
    </div>
  )
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
export async function getStaticProps() {
  return { props: { __TEMPLATE_QUERY_DATA__: {
        page: {
          translation: {
            DELang: {
              link: `/blog-de/`,
            },
            ENLang: {
              link: `/en/blog/`,
            },
          },
        },
      } } }
}

export default BlogDePage
