const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist')
}

module.exports = {
  //已多次提及的唯webp一入口文件
  entry: PATHS.src + "/main.js",
  //打包输出
  output: {
    path: PATHS.dist,//打包后的文件存放的地方
    filename: 'js/[name].js',//打包后输出文件的文件名
    chunkFilename: 'js/[name].js'
  },
  //方便调试，可f12追踪源码
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,//不跳转
    inline: true//代码实时刷新
  },
  resolve: {
    alias: {
      // 定义文件路径， 加速打包过程中webpack路径查找过程
      'js': path.join(__dirname, 'src/js'),
      'css': path.join(__dirname, 'src/css')
    },
     // 可以不加后缀, 直接使用 import xx from 'xx' 的语法
    extensions: ['.js', '.less', '*', '.json']       
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "env", "react"
            ]
          }
        },
        exclude: /node_modules/
      },
      //css-loader 和 style-loader，二者处理的任务不同，css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader'
          ]
        })
      },
      {
          test: /\.(eot|svg|ttf|woff|woff2)\w*/,
          loader: 'url-loader?limit=1000000'
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(PATHS.src, 'index.html'), //html模板路径
      inject: 'body', // 是否将js放在body的末尾
      hash: true,
      cache: false,
    }),
    new ExtractTextPlugin({                                   // css抽离插件,单独放到一个style文件当中.
      filename: `css/style.css`,
      allChunks: true,
      disable: false
    })
  ]
}
