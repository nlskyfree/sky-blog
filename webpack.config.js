const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const PATHS = {
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist')
}

module.exports = {
  entry: {
    app: './src/main.js',           // 整个SPA的入口文件, 一切的文件依赖关系从它开始
    vendors: ['vue', 'vue-router']  // 需要进行单独打包的文件
  },
  output: {
    path: PATHS.dist,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  // 
  devtool: '#eval-source-map',
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.js/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader?limit=10240&name=images/[name].[ext]'
    },
    {
      test: /\.(woff|otf|eot|ttf)(\?.*)?$/,
      loader: 'url-loader?limit=10240&name=fonts/[name].[ext]'
    },
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
    }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'components': path.join(__dirname, 'src/components'),   // 定义文件路径， 加速打包过程中webpack路径查找过程
      'lib': path.join(__dirname, 'src/lib'),
      'less': path.join(__dirname, 'src/less'),
      'utils': path.join(__dirname, 'src/utils')
    },
    extensions: ['.js', '.less', '.vue', '*', '.json']        // 可以不加后缀, 直接使用 import xx from 'xx' 的语法
  },
  plugins: [
    new HtmlWebpackPlugin({                                   // html模板输出插件
      title: 'nlskyfree',
      template: './src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin({                                   // css抽离插件,单独放到一个style文件当中.
      filename: 'css/style.css',
      allChunks: true,
      disable: false
    })
  ]
}