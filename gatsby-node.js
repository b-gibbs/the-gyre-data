const path = require('path');

// This is a shortcut so MDX can import components without gross relative paths.
// Example: import { Image } from '$components';
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: { $components: path.resolve(__dirname, 'src/components') },
    },
    node: {
      fs: 'empty'
    }
  });
};

/* Define the Resource type */
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Resource implements Node @dontInfer {
      id: ID!
      slug: String!
      title: String!
      subtitle: String
      priority: Int!
      category: String!
      tags: [String!]
      author: String!
      pubYear: String! @proxy(from:"pub_year")
      type: String!
      image: String!
      url: String!
      description: String!
    }
  `)
};
