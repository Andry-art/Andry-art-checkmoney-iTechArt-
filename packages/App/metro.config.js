/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const getWorkspaces = require('get-yarn-workspaces');
const path = require('path');

const watchFolders = [
  path.resolve(__dirname, '..', '..', 'node_modules'),
  ...getWorkspaces(__dirname).filter(
    workspaceDir => !(workspaceDir === __dirname),
  ),
];

module.exports = {
  watchFolders,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
