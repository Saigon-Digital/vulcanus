/** @type {import('next-sitemap').IConfig} */
const paths = require("./src/data/site_map.json")
  
if (!process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL is not set. Refusing to build a sitemap with a fallback domain."
  )
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
  priority: 0.7,
  additionalPaths: async (config) => {
    const result = []
    for (let path of paths) {
      result.push({
        loc: path.uri,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      })
    }

    return result
  },
}
