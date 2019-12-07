# ぬるく始めてきっちり作るTypeScript+React+SSR構成

TypeScript+React+SSR(NodeJS)構成のサンプル  

- TypeScript(@babel/preset-typescript)
- React
- NodeJS(express+nodemon+@babel/node)
- webpack+HMR(webpack-dev-middleware+webpack-hot-middleware)
- babel
- redux
- react-helmet-async
- dynamic-import(lodable-component)
- eslint
- material-ui(MUI)

動作確認環境：  

- MacOS Catalina
- node v13.2.0
- yarn 1.9.4

前準備：  

```
# yarnのインストール
$ brew install yarn
# nodemonのインストール
$ yarn global add nodemon
# @babel/nodeのインストール
$ yarn global add @babel/node
```

起動方法：  

```
$ yarn dev
```