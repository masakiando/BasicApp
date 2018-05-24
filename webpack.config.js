// module.exports = {
//   entry: './src/app.js',
//   output: {
//     filename: './dist/app.bundle.js'
//   }
// }
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const BUILD_DIR = path.join(__dirname, 'dist');
const APP_DIR = path.join(__dirname, 'src');
const  VENDOR_LIBS = ['react', 'react-dom', 'react-router-dom']

const config = {
  // entry: [
  //   APP_DIR + '/index.js'
  // ],
  entry: {
    bundle: APP_DIR + '/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    // path: BUILD_DIR,
    // filename: '[name].[hash].js'
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  watch: true,
  module: {
    rules:[
      {
        test:/\.(js|jsx)$/,
        // include: APP_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ["babel-preset-env", "react", "stage-2"],
          plugins: ['syntax-dynamic-import']
        }
      },
      {
        test: /\.(scss|css)$/,
        loader: ['style-loader','css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: ['file-loader']
      }
    ]
  },
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    port: 9000,
    disableHostCheck: false,
    open: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
const APP_DIR_2 = path.resolve(__dirname, 'src');
const APP_DIR_3 = path.resolve('test', '../back');
const APP_DIR_4 = path.resolve('src');
const APP_DIR_5 = path.resolve('/foo/bar', 'tmp/file/')
const APP_DIR_6 = path.resolve('/foo/bar', '/tmp/file/')
console.log(APP_DIR);
console.log(APP_DIR_2);
console.log(APP_DIR_3);
console.log(APP_DIR_4);
console.log(APP_DIR_5);
console.log(APP_DIR_6);
function exists(pth, mode) {
  console.log(pth);
  try {
    fs.accessSync(pth, mode)
    return true;
  } catch (e) {
    return false;
  }
}
console.log(exists(__dirname + '/src', 'sss'));

module.exports = config;
