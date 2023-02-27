const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.jsx',
  output: {
    path: __dirname + '/dist/',
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: [path.resolve('node_modules')],
        resolve: {
          extensions: ['.js','.jsx'],
        },
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: prod ? [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                  : ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin()
  ],
};

