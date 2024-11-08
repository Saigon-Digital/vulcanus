const {withFaust, getWpHostname} = require("@faustwp/core");

/** @type {import('next').NextConfig} */
const nextConfig = withFaust({
  async redirects() {
    return [
      {
        source: '/en/home-page',
        destination: '/en',
        locale:false,
        permanent: true,
      },{
        source: '/preview',
        destination: '/',
        permanent: true,
    
      },{
        source: '/en/preview',
        locale:false,
        destination: '/en',
        permanent: true,
      }
    ]
  },
  reactStrictMode: true,
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {not: [...fileLoaderRule.resourceQuery.not, /url/]},
        use: ["@svgr/webpack"],
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;

    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });

    return config;
  },
  images: {
    domains: [getWpHostname()],
  },
  i18n: {
    locales: ["de", "en"],
    defaultLocale: "de",
    localeDetection: false,
  },
});

module.exports = nextConfig;
//triger build
