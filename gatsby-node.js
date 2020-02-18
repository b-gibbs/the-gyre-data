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