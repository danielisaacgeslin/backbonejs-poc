import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';

module.exports = {
  entry: [
    './src/webpack-public-path',
    'webpack-hot-middleware/client?reload=true',
    'babel-polyfill',
    path.resolve(__dirname, './src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'build'), // eslint-disable-line
    publicPath: '/',  // relativa al webpak.config
    filename: './src/bundle.js'
  },
  stats: {
    colors: true,
    reasons: true //if fail, show it very verbose
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        query: {
          plugins: ['transform-runtime']
        },
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /(\.css|\.scss)$/, loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap'] },
      { test: /\.(jpe?g|png|gif|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=10000&name=./src/img/[hash].[ext]' },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
      { test: /=\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&name=./src/css/fonts/[hash].[ext]&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&name=./src/css/fonts/[hash].[ext]&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&name=./src/css/fonts/[hash].[ext]&mimetype=image/svg+xml' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.html$/, loader: 'html-loader' },
    ],
  },
  postcss: [autoprefixer],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.ejs',
    })
  ],
};
