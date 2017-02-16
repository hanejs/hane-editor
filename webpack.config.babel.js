import path from 'path'
import webpack from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
const extractStyle = new ExtractTextPlugin('css/bundle.[hash:8].css')

const DEBUG = process.env.NODE_ENV !== 'production' ? true : false

const rootPath = __dirname
const publicPath = path.join(rootPath, 'public')
const babelQueries = [
  'presets[]=es2015',
  'presets[]=stage-0',
  'presets[]=react',
]

let loaders = [
  {
    test: /\.(png|jpg|gif)$/,
    loader: 'url-loader?limit=10000&name=images/build/[name].[hash:8].[ext]',
  },
  {
    test: /\.css$/,
    loaders: [ 'style-loader', 'css-loader?root=' + rootPath ],
  },
]

let plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new HtmlWebpackPlugin({
    filename: DEBUG ? 'index.html' : '../index.html',
    template: 'views/index.html',
    inject: true,
  }),
]

if (DEBUG) {
  loaders = [
    ...loaders,
    {
      test: /\.es$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['react-hot-loader', 'babel-loader?' + babelQueries.join(',')],
      // loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react'],
    },
    {
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader?sourceMap&root=' + rootPath,
        //'postcss',
        'sass-loader?sourceMap&sourceMapContents',
      ],
      exclude: /node_modules/,
      //include: path.join(__dirname, 'style/scss/sass'),
    },
  ]
  plugins = [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
  ]
} else {
  loaders = [
    ...loaders,
    {
      test: /\.es$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader?' + babelQueries.join(','),
    },
    {
      test: /\.scss/,
      loaders: extractStyle.extract([ 'css-loader?root=' + rootPath, 'sass-loader' ]),
    },
  ]
  plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    extractStyle,
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
  ]
}

let webpackConfig = {
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
    loaders,
  },
  plugins,
}

if (DEBUG) {
  // webpackConfig.output.publicPath = baseUrl + '/assets/'
  webpackConfig = {
    ...webpackConfig,
    // debug: true,
    devtool: 'source-map',
    devServer: {
      hot: true,
      historyApiFallback: {
        index: '/assets/index.html',
      },
    },
  }
}

export default webpackConfig
