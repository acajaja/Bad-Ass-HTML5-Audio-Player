'use strict'

const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');
const baseJsDir = './src';
const outputBaseDir = path.resolve(__dirname, 'dist');
const nodeModsPath = path.resolve(__dirname, 'node_modules');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
}
else {
    require('dotenv').config();
}

module.exports = (env, argv) => {
  const isProd = process.env.NODE_ENV === 'production';

  let baseConfig = {
    devtool: isProd ? 'source-map' : 'inline-source-map',
    mode: process.env.NODE_ENV,
    entry: ["regenerator-runtime/runtime.js", `${baseJsDir}/init.js`],
    output: {
      /////////////////////
      // Deletes everything
      // in the output dir
      clean: true, ////////
      /////////////////////
      filename: `WebAudioPlayer.init.js`,
      path: outputBaseDir
    },
    module: {
      rules: [
        {
            exclude: nodeModsPath,
            loader: 'babel-loader',
            test: /\.js$/,
            options: {
                presets: ['@babel/preset-env'],
                targets: 'defaults'
            }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
          'process.env.PLAYLIST_BASE_URL': JSON.stringify(process.env.PLAYLIST_BASE_URL)
      })
    ]
  };

  if (!isProd) {
    return baseConfig;
  }

  baseConfig.plugins.push(new WebpackObfuscator());
  baseConfig.module.rules.push({
    test: /designer\.js$/,
    enforce: 'post',
    use: { 
        loader: WebpackObfuscator.loader, 
        options: {
          log: true
        }
    }
  });
  baseConfig.module.rules.push({
    test: /grid\.js$/,
    enforce: 'post',
    use: { 
        loader: WebpackObfuscator.loader, 
        options: {
          log: true
        }
    }
  });

  return baseConfig;
}
