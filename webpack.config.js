const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: './client/app.js'
  },
  output: {
    filename: 'build/bundle.js',
    sourceMapFilename: 'build/bundle.map',
    path: path.resolve(__dirname, 'dist/public/')
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
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: '[name].[ext]',
              outputPath: 'build/assets/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
  ]
}
