const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractStyle = new ExtractTextPlugin('css/bundle.[hash:8].css')

const rootPath = __dirname
const publicPath = path.join(rootPath, 'public')
const babelQueries = [
  'presets[]=es2015',
  'presets[]=stage-0',
  'presets[]=react',
]

module.exports = {
  entry: [
    // 'webpack-hot-middleware/client',
    './src/index',
    './style/main',
  ],
  output: {
    path: path.resolve(publicPath, 'assets'),
    publicPath: '/assets/',
    filename: 'js/bundle.[hash:8].js',
  },
  resolve: {
    extensions: [ '.es', '.js', '.scss' ],
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=10000&name=images/build/[name].[hash:8].[ext]',
      },
      {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader?root=' + rootPath ],
      },
      {
        test: /\.es$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?' + babelQueries.join(','),
      },
      {
        test: /\.scss/,
        loaders: extractStyle.extract([ 'css-loader?root=' + rootPath, 'sass-loader' ]),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'views/index.html',
      inject: true,
    }),
    extractStyle,
    // new webpack.HotModuleReplacementPlugin(),
  ]
};
