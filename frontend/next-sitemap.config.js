/** @type {import('next-sitemap').IConfig} */
const paths = require("./src/data/site_map.json")
  
if (!process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL is not set. Refusing to build a sitemap with a fallback domain."
  )
}

// WordPress placeholder/thin pages that should not be indexed.
const EXCLUDED_URIS = [
  "/bilingual-coming-soon",
  "/en/coming-soon",
  "/post", // leftover listing stub
  "/datencontroller", // empty cookie-tool page
]

// Same rules as cleanUri() in src/utils/seoUrls.ts, so sitemap URLs match the
// canonical URLs: no trailing slash, "/en/home-page" is served at "/en".
function toServedPath(uri) {
  if (!uri) return undefined
  const path = uri.replace(/\/+$/, "")
  if (path === "") return "/"
  return path === "/en/home-page" ? "/en" : path
}

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        // technical paths that should not be crawled
        disallow: ["/api/", "/preview", "/en/preview"],
      },
    ],
    // next-sitemap always adds a "Host:" line; Google ignores it (Yandex only)
    transformRobotsTxt: async (_config, robotsTxt) =>
      robotsTxt.replace(/# Host\nHost: .*\n\n?/, ""),
  },
  sitemapSize: 5000,
  // Google ignores priority/changefreq, and a build-time lastmod is a lie.
  priority: undefined,
  changefreq: undefined,
  autoLastmod: false,
  // auto-discovered Next pages that must not be listed
  exclude: ["/preview", "/en/preview"],
  additionalPaths: async (config) => {
    const result = []
    for (let path of paths) {
      const loc = toServedPath(path.uri)
      if (!loc || EXCLUDED_URIS.includes(loc)) continue
      // real WordPress modified date (GMT, no zone suffix in WPGraphQL)
      result.push({
        loc,
        lastmod: path.modifiedGmt ? `${path.modifiedGmt}Z` : undefined,
      })
    }

    return result
  },
}
