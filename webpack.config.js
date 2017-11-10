const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: './client/app.js'
  },
  output: {
    filename: 'public/build/bundle.js',
    sourceMapFilename: 'public/build/bundle.map'
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          plugins: [['lodash', {'id': ['lodash', 'semantic-ui-react'] }]],
          presets: ['react', 'env', 'stage-2']
        }
      }
    ]
  }
}
