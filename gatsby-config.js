require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Data ∩ Product',
    siteName: 'Data Science',
    description: `The intersection of data science and product management.`,
    author: `Bradley Gibbs`,
    twitterHandle: '@thegyre',
  },
  pathPrefix: '/data',
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `dnp-docs`,
        short_name: `dnp`,
        start_url: `/`,
        background_color: `#0E2339`,
        theme_color: `#0E2339`,
        display: `minimal-ui`,
        icon: `src/images/mark.svg`,
      },
    },
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        subtitle: 'Data Science',
        baseUrl: 'https://thegyre.io',
        root: __dirname,
        description: 'The intersection of data science and product management',
        githubRepo: 'https://github.com/b-gibbs/the-gyre',
        defaultVersion: '1',
        trackingId: '',
        twitterHandle: '@thegyre',
        spectrumHandle: 'data-product',
        algoliaApiKey: process.env.ALGOLIA_API_KEY,
        algoliaIndexName: process.env.ALGOLIA_APP_ID,
        youtubeUrl: '',
        logoLink: 'https://thegyre.io',
        navConfig: {
          'Home': {
            url: 'https://www.thegyre.io',
          },
          'Product Management': {
            url: 'https://www.thegyre.io/product',
          },
          'Blog': {
            url: 'https://www.thegyre.io/blog',
          },
          Github: {
            url: 'https://github.com/b-gibbs/the-gyre',
          },
        },
        footerNavConfig: {

        },
        sidebarCategories: {
          null: [
            'index',
            'about',
          ],
          Data: [
            'data/index',
            'data/lifecycle',
            'data/machine-learning',
          ],
        },
      },
    },
  ],
}
