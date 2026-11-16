import {
  PagesSettingFragment,
  SiteSettingFragment,
  YoastSeoFragment,
} from "@/__generated__/graphql"
import Head from "next/head"
import {useRouter} from "next/router"
export type TSEO = {
  seo?: PagesSettingFragment | null | undefined
  yoast?: YoastSeoFragment | null | undefined
  // true for blog posts: Yoast wins over ACF. Pages keep ACF first because their
  // ACF titles are keyword-written while their Yoast titles are just the page name.
  yoastFirst?: boolean
  ENUri?: string | null | undefined
  DEUri?: string | null | undefined
  defaultSEO?: SiteSettingFragment | null | undefined
  link?: string | null | undefined
  pageTitle?: string
  slug: string
  canonical: string
  schema?: Record<string, unknown>
}
const SEO = (props: TSEO) => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ""
  const {seo: onPageSeo, yoast, yoastFirst, link, defaultSEO, DEUri, ENUri} = props
  const favicon = defaultSEO?.favicon?.node?.sourceUrl
  const {locale} = useRouter()

  // Posts: Yoast, then ACF Page Settings. Pages: ACF, then Yoast. Either way the
  // site default is the last resort. Titles are shown exactly as typed (Yoast
  // adds its own " - Vulcanus"); the code adds or removes no brand suffix.
  const pick = <T,>(fromYoast: T, fromAcf: T): T =>
    (yoastFirst ? fromYoast || fromAcf : fromAcf || fromYoast) as T

  const seo = {
    title:
      pick(yoast?.title?.trim(), onPageSeo?.title?.trim()) ||
      defaultSEO?.siteTitle,
    // The site-wide default description is German, so it is only a valid
    // fallback on German pages. English pages without their own description
    // get none, rather than a German one.
    description:
      pick(yoast?.metaDesc?.trim(), onPageSeo?.description?.trim()) ||
      (locale === "en" ? undefined : defaultSEO?.description),
    image:
      pick(
        yoast?.opengraphImage?.sourceUrl,
        onPageSeo?.socialGraphImage?.node?.sourceUrl
      ) || defaultSEO?.openGraphImage?.node.sourceUrl,
    seoCanonical: props.canonical,
    url: props.canonical,
  }

  // ponytail: sameAs hardcoded from the live footer; read from CMS footerSetting if they start changing
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Vulcanus-Stahl & Maschinenbau GmbH",
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        sameAs: [
          "https://www.linkedin.com/company/vulcanus-stahl-und-maschinenbau-gmbh",
          "https://www.xing.com/pages/vulcanus-stahl-maschinenbau-gmbh",
          "https://www.facebook.com/vulcanusstahl.de/",
          "https://www.instagram.com/vulcanusstahl.de/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Vulcanus Stahl",
        publisher: {"@id": `${siteUrl}/#organization`},
        inLanguage: ["de", "en"],
      },
      ...(props.schema ? [props.schema] : []),
    ],
  }

  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={favicon || "/images/favicon.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={favicon || "/images/favicon.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={favicon || "/images/favicon.png"}
      />

      {seo.title && (
        <>
          <title>{seo.title}</title>
          <meta name="title" content={seo.title} />
          <meta property="og:title" content={seo.title} />
          <meta property="twitter:title" content={seo.title} />
        </>
      )}

      {seo.description && (
        <>
          <meta name="description" content={seo.description} />
          <meta property="og:description" content={seo.description} />
          <meta property="twitter:description" content={seo.description} />
        </>
      )}

      {seo.image && (
        <>
          <meta property="og:image" content={seo.image} />
          <meta property="twitter:image" content={seo.image} />
        </>
      )}

      {seo.url && (
        <>
          <meta property="og:url" content={seo.url} />
          <meta property="twitter:url" content={seo.url} />
        </>
      )}
      {(props.seo?.noIndexNoFollow ||
        yoast?.metaRobotsNoindex === "noindex") && (
        <meta name="robots" content="noindex, nofollow" />
      )}

      {seo.seoCanonical && <link rel="canonical" href={seo.seoCanonical} />}
      {DEUri && <link rel="alternate" hrefLang="x-default" href={DEUri} />}
      {DEUri && <link rel="alternate" hrefLang="de" href={DEUri} />}
      {ENUri && (
        <link
          rel="alternate"
          hrefLang="en"
          href={ENUri?.replace("homepage/", "")}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // escape "<" so CMS text can't close the script tag
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </Head>
  )
}

export default SEO
