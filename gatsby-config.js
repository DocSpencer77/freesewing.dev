const searchData = require("./src/algolia")
require("dotenv").config()

module.exports = {
  plugins: [
		{
    	resolve: `gatsby-plugin-nprogress`,
    	options: {
    	  color: "#37b24d",
    	  //showSpinner: false,
    	},
  	},
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
		{
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_API_ID,
        apiKey: process.env.GATSBY_ALGOLIA_UPDATE_KEY,
        queries: searchData(process.env.GATSBY_LANGUAGE),
        chunkSize: 1000,
      },
    },
  ],
};

