//const queries = require("./src/algolia")
//require("dotenv").config()

module.exports = {
  plugins: [
		//{
    //  resolve: `gatsby-plugin-algolia`,
    //  options: {
    //    appId: process.env.GATSBY_ALGOLIA_APP_ID,
    //    apiKey: process.env.ALGOLIA_ADMIN_KEY,
    //    queries,
    //    chunkSize: 10000,
    //  },
    //},
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/markdown/dev`,
        name: 'markdown',
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
            },
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-autolink-headers"
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
  ],
};
