// import { Configuration } from 'webpack'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// /**
//  * @type Configuration
//  */
const config = {
  entry: './src/main.js', // 入口文件
  output: { // 配置生成的chunk: 位置和名称
    path: path.join(__dirname, './lib'),
    filename: 'bundle.js'
  },
  module: { // 通过loader处理非js文件或者处理js文件降级
    rules: [
      {
        test: /\.js$/, // 正则
        use: ['babel-loader'] // 匹配到的js文件,使用babel-loader处理, babel-loader中调用babel的配置在根路径下配置了（preset-env和preset-react以及runtime）
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),   // dist目录开启服务器
    compress: true,    // 是否使用gzip压缩
    port: 9000,    // 端口号
    open : true   // 自动打开网页·
  }
  
}

module.exports = config