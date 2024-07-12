/** @type {import('next-sitemap').IConfig} */
const paths = require("./src/data/site_map.json")

module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://vulcanus.netlify-stahl.app",
  generateRobotsTxt: true,
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
