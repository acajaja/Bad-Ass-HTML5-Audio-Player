'use strict'

const path = require('path');
const baseJsDir = path.resolve(__dirname, 'src');
const outputBaseDir = path.resolve(__dirname, 'dist');
// const nodeModsPath = path.resolve(__dirname, 'node_modules');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
}
else {
    require('dotenv').config();
}

module.exports = (env, argv) => {
  const isProd = process.env.NODE_ENV === 'production';

  return {
    devtool: isProd ? 'source-map' : 'inline-source-map',
    mode: process.env.NODE_ENV,
    entry: [
      // 'regenerator-runtime/runtime.js',
      `${baseJsDir}/WebAudioPlayer/WebAudioPlayer.js`
    ],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        terserOptions: {
          ecma: 2021,
          mangle: true,
          keep_classnames: true,
          keep_fnames: true,
          module: true
        }
      })]
    },
    experiments: {
      outputModule: true,
    },
    output: {
      /////////////////////
      // Deletes everything
      // in the output dir
      clean: true, ////////
      /////////////////////
      filename: `WebAudioPlayer.min.js`,
      libraryTarget: "module",
      module: true,
      path: outputBaseDir
    },
    plugins: [
      new webpack.DefinePlugin({
          'process.env.PLAYLIST_BASE_URL': JSON.stringify(process.env.PLAYLIST_BASE_URL)
      })
    ]
  }
}
