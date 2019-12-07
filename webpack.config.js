const path = require('path')
const webpack = require('webpack')
const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = {
  mode: 'development', // 開発モードビルド
  // ビルド対象のアプリケーションのエントリーファイル
  entry: [
    'webpack-hot-middleware/client', // HMR debug用
    'core-js/modules/es.promise', // IEでPromiseを使えるようにする
    'core-js/modules/es.array.iterator', // IEでArrayのiteratorを使えるようにする
    './client/index.tsx'
  ], 
  devtool: 'inline-cheap-module-source-map', // ソースマップを出力するための設定、ソースマップファイル（.map）が存在する場合、ビルド前のソースファイルでデバッグができる
  output: {
    path: path.resolve(__dirname, 'dist'), // 出力するフォルダ名(dist)
    filename: 'bundle.js', // 出力するメインファイル名
    publicPath: '/public/' // ホスティングするフォルダ
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      { 
        test: /\.ts(x?)$/, // .ts .tsxがbabelのビルド対象
        exclude: /node_modules/, // 関係のないnode_modulesはビルドに含めない
        use: [
          {loader: 'babel-loader'}, // babel
          {loader: 'eslint-loader'}, // eslint
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR debug用
    new LoadablePlugin(),
  ],
}