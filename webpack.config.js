/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const getEntryPoints = (directory) => fs.readdirSync(path.join(__dirname, directory))
  .filter((file) => !fs.statSync(path.join(directory, file)).isDirectory())
  .reduce((entries, file) => ({
    ...entries,
    [file.split('.')[0]]: `./${directory}/${file}`,
  }), {});

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: () => getEntryPoints('src/js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
    ],
  },
  output: {
    filename: '[name].legacy.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
