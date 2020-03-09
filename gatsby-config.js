const queries = require('./src/utils/algolia');
const jargon = require('./jargon');
require('dotenv').config();


module.exports = {
  siteMetadata: {
    title: "Data ∩ Product",
    siteName: "Data Science",
    description: `The intersection of data science and product management.`,
    author: `Bradley Gibbs`,
    twitterHandle: "@thegyre",
  },
  pathPrefix: "/data",
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `dnp-docs`,
        short_name: `dnp`,
        start_url: `/`,
        background_color: `#0E2339`,
        theme_color: `#0E2339`,
        display: `minimal-ui`,
        icon: `src/images/dp-logo-16x16.png`,
      },
    },
    {
      resolve: "gatsby-theme-apollo-docs",
      options: {
        subtitle: "Data Science",
        baseUrl: "https://thegyre.io",
        root: __dirname,
        description: "The intersection of data science and product management",
        githubRepo: "https://github.com/b-gibbs/the-gyre",
        defaultVersion: "1",
        trackingId: "",
        twitterHandle: "@thegyre",
        spectrumHandle: "data-product",
        algoliaApiKey: process.env.ALGOLIA_API_KEY,
        algoliaIndexName: process.env.ALGOLIA_APP_ID,
        youtubeUrl: "",
        logoLink: "https://thegyre.io",
        navConfig: {
          Home: {
            url: "https://www.thegyre.io",
          },
          "Product Management": {
            url: "https://www.thegyre.io/product",
          },
          Blog: {
            url: "https://www.thegyre.io/blog",
          },
          Resources: {
            url: "https://www.thegyre.io/resources",
          },
          Github: {
            url: "https://github.com/b-gibbs/the-gyre",
          },
        },
        footerNavConfig: {},
        sidebarCategories: {
          null: ["index"],
          Lifecycle: ["lifecycle/index"],
          "Machine Learning": ["machine-learning/index"],
          "Deep Learning": ["deep-learning/index"],
          Resources: [
            "[Recommended Reading](https://thegyre.io/resources/category/data)",
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_API_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    {
      resolve: `gatsby-plugin-segment-js`,
      options: {
        // your segment write key for your production environment
        // when process.env.NODE_ENV === 'production'
        // required; non-empty string
        prodKey: process.env.GATSBY_SEGMENT_PRODUCTION_WRITE_KEY,

        // if you have a development env for your segment account, paste that key here
        // when process.env.NODE_ENV === 'development'
        // optional; non-empty string
        devKey: process.env.GATSBY_SEGMENT_DEV_WRITE_KEY,

        // boolean (defaults to false) on whether you want
        // to include analytics.page() automatically
        // if false, see below on how to track pageviews manually
        trackPage: true,

        // boolean (defaults to false); whether to delay load Segment
        // ADVANCED FEATURE: only use if you leverage client-side routing (ie, Gatsby <Link>)
        // This feature will force Segment to load _after_ either a page routing change
        // or user scroll, whichever comes first. This delay time is controlled by
        // `delayLoadTime` setting. This feature is used to help improve your website's
        // TTI (for SEO, UX, etc).  See links below for more info.
        // NOTE: But if you are using server-side routing and enable this feature,
        // Segment will never load (because although client-side routing does not do
        // a full page refresh, server-side routing does, thereby preventing Segment
        // from ever loading).
        // See here for more context:
        // GIF: https://github.com/benjaminhoffman/gatsby-plugin-segment-js/pull/19#issuecomment-559569483
        // TTI: https://github.com/GoogleChrome/lighthouse/blob/master/docs/scoring.md#performance
        // Problem/solution: https://marketingexamples.com/seo/performance
        delayLoad: false,

        // number (default to 1000); time to wait after scroll or route change
        // To be used when `delayLoad` is set to `true`
        delayLoadTime: 1000,
      },
    },
    {
      resolve: `gatsby-plugin-amplitude-analytics`,
      options: {
        // Specify the API key for your Amplitude Project (required)
        apiKey: process.env.GATSBY_AMPLITUDE_API_KEY,
        // Puts tracking script in the head instead of the body (optional)
        head: false,
        // Prevents loading Amplitude and logging events if visitors have "Do Not Track" enabled (optional)
        respectDNT: false,
        // Avoids sending pageview hits from custom paths (optional)
        exclude: [],
        // Override the default event types (optional)
        eventTypes: {
          outboundLinkClick: "OUTBOUND_LINK_CLICK",
          pageView: "PAGE_VIEW",
        },
        // Amplitude JS SDK configuration options (optional)
        amplitudeConfig: {
          saveEvents: true,
          includeUtm: true,
          includeReferrer: true,
        },
      },
    },
  ],
}
