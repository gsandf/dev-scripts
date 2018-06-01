const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { dirname, resolve } = require('path');
const { DefinePlugin } = require('webpack');

const __DEV__ = process.env.NODE_ENV !== 'production';

const devOnlyConfig = {
  plugins: [
    // Prioritizes build-time errors and shows them in a clean way
    new FriendlyErrorsWebpackPlugin({
      clearConsole: __DEV__
    })
  ]
};

const productionOnlyConfig = {};

const sharedConfig = {
  entry: './src/index.js',

  output: {
    filename: 'server.js',
    path: resolve(dirname('index.js'), 'dist'),
    // Use a target that's natively compatible with Node.js
    libraryTarget: 'commonjs2',
    sourceMapFilename: 'server.js.map'
  },

  mode: __DEV__ ? 'development' : 'production',

  // Since we are not targeting a browser, bundle size is not relevant.
  performance: {
    hints: false
  },

  plugins: [
    // Add a "shebang" so the built file can be executed from the terminal.
    new BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true
    }),

    // Define commonly-used global variables. Note: if you use an eslint config,
    // you will want to set these as global variables there, too.
    new DefinePlugin({
      __DEV__
    })
  ],

  // Let `FriendlyErrorsWebpackPlugin` have full control over stats output
  stats: __DEV__ ? 'none' : 'normal',

  // Webpack supports multiple targets. This config is for Node.js.
  target: 'node'
};

const temp = {
  ...(__DEV__ ? devOnlyConfig : productionOnlyConfig),
  ...sharedConfig
};

module.exports = temp;
