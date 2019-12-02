const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development', // 開発モードビルド
  entry: './src/index.tsx', // ビルド対象のアプリケーションのエントリーファイル
  devtool: "source-map", // ソースマップを出力するための設定、ソースマップファイル（.map）が存在する場合、ビルド前のソースファイルでデバッグができる
  output: {
    path: path.resolve(__dirname, 'dist'),  // 出力するフォルダ名(dist)
    filename: 'bundle.js' // 出力するメインファイル名
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      { 
        test: /\.ts(x?)$/, // .ts .tsxがbabelのビルド対象
        exclude: /node_modules/, // 関係のないnode_modulesはビルドに含めない
        use: {
          loader: 'babel-loader', // babel
          options: {
            presets: [
              // polyfillのpreset
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3,
                modules: false // ECMAScript向けビルド
              }],
              // reactのpreset
              '@babel/preset-react',
              // typescript→javascript変換のpreset
              '@babel/preset-typescript'
            ],
            // プラグイン
            plugins: [
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-syntax-nullish-coalescing-operator'
            ]
          },
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './index.html'}) // ビルドしたbundle.jsをindex.htmlに埋め込む
  ]
}