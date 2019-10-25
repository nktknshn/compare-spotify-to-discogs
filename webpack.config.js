'use strict';

// Dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  // Only utilise some features in certain environments
  const devMode = env && env.DEV_MODE;
  const serverMode = env && env.SERVER_MODE;

  // Don't use an eval() source map, it will breach default
  // content_security_policy. Whilst that key could be changed in the manifest
  // it's better to just use these slightly slower non-eval sourcemaps
  const devtool = 'cheap-module-source-map'

  const plugins = [
    new CopyWebpackPlugin([
      // { from: './public/index.html' },
      { from: './public/index.html' },
      // { from: './src/manifest.json' },
    ]),
    // new BundleAnalyzerPlugin()
  ];

  // if (serverMode) plugins.push(new HtmlWebpackPlugin({
  // 	filename: 'index.html',
  // 	template: './src/templates/simulator.html',
  // 	chunks: [],
  // }));

  const cfg = {
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
      // 'index': './src/index-react',
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
