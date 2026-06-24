import React from "react"
import Hero from "@/components/Hero"
import BlogsBlock from "@/components/BlogsBlock"

function BlogDePage() {
  const heroProps = {
    title: "CNC, Mechanical Engineering, Industry Blogs & Insights",
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
      "CNC, Mechanical Engineering, Industry Blogs & Insights\nWelcome to the Vulcanus-Stahl & Maschinenbau GmbH blog! Here, you'll find industrial insights into our latest projects, innovations in CNC manufacturing, and practical tips from the world of mechanical engineering. Learn more about our technologies, achievements, and how we put our passion for precision into action every day.",
    button: {
      title: "About Us",
      url: "/en/about-us",
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
    
    "fieldGroupName": "PageBuilderDynamicBlocksBlogsLayout",
    "tittle": null,
    "ctaBlocks": [
        {
            "title": "Get in touch",
            "ctaButton": {
                "fieldGroupName": "BlogsCtaBlocksCtaButton",
                "text": "contact us",
                "link": {
                    "title": "Contact",
                    "url": "https://holgerk1.sg-host.comen/contact/",
                    "target": ""
                }
            },
            "contactInfo": "<p>We are your partner for CNC manufacturing of individual parts and series, custom designs, and repair work.</p>\n"
        },
        {
            "title": "Workplace training offers!",
            "ctaButton": {
                "fieldGroupName": "BlogsCtaBlocksCtaButton",
                "text": "work with us",
                "link": {
                    "title": "Contact",
                    "url": "https://holgerk1.sg-host.comen/contact/",
                    "target": ""
                }
            },
            "contactInfo": "<p>Please apply in writing, preferably by e-mail, to: <a href=\"mailto:bewerbung@vulcanus-stahl.de\">bewerbung@vulcanus-stahl.de</a> We look forward to receiving your applications.</p>\n"
        }
    ]
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
