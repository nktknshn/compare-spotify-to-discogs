'use strict';

// Dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')

module.exports = (env) => {
  // Only utilise some features in certain environments
  const devMode = env && env.DEV_MODE;
  const devtool = devMode ? 'cheap-module-source-map' : false;

  const plugins = [
    new CopyWebpackPlugin([
      { from: './public/index.html' },
    ]),
    new webpack.DefinePlugin({
      DEVMODE: devMode
    })
    // new BundleAnalyzerPlugin()
  ];

  const cfg = {
    mode: devMode ? 'development' : 'production',
    devtool,
    devServer: {
      contentBase: './dist/',
      allowedHosts: ['hotmeal']
    },
    externals: {

    },
    plugins,
    context: __dirname,
    target: 'web',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [new TsConfigPathsPlugin()],
    },
    entry: {
      'index-redux': './src/index-react-redux',
    },
    output: {
      filename: '[name].build.js',
      path: `${__dirname}/dist/`,
      devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          // "types": ["spotify-web-api-js"],
          exclude: /node_modules/,
        },
      ],
    },
  };

  return cfg;
};
