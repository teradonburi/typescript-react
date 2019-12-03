import path from 'path'
import { Request, Response } from 'express'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ChunkExtractor } from '@loadable/server'
import reducer from "../client/reducer/reducer"

const app = express()

if (process.env.NODE_ENV !== 'production') {
  const webpackConfig = require('../webpack.config')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpack = require('webpack')

  // サーバ起動時、src変更時にwebpackビルドを行う
  const compiler = webpack(webpackConfig)

  // バックエンド用webpack-dev-server
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      // 書き込むファイルの判定
      writeToDisk(filePath: string) {
        return /loadable-stats/.test(filePath)
      },
    }),
  )
  // HMR
  app.use(webpackHotMiddleware(compiler))
}

app.use(express.static(path.join(__dirname, '../public')))

const nodeStats = path.resolve(
  __dirname,
  '../dist/loadable-stats.json',
)

// Redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// StaticRouter
import { StaticRouter } from 'react-router-dom'
import { Router } from "../client/Router"

app.get(
  '*',
  (req: Request, res: Response) => {

    // 疑似ユーザ作成（本来はDBからデータを取得して埋め込む)
    const users = [{'gender': 'male', 'name': {'first': 'テスト', 'last': '太郎'}, 'email': '', 'picture': {'thumbnail': 'https://avatars1.githubusercontent.com/u/771218?s=460&v=4'}}]
    const initialData = { user: {users} }
    // Redux Storeの作成(initialDataには各Componentが参照するRedux Storeのstateを代入する)
    const store = createStore(reducer, initialData)

    const context = {}

    // ChunkExtractorでビルド済みのチャンク情報を取得
    // loadable-stats.jsonからフロントエンドモジュールを取得する
    const extractor = new ChunkExtractor({ statsFile: nodeStats })

    const App: React.SFC = () => (
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Router />
        </StaticRouter>
      </Provider>
    )

    const jsx = extractor.collectChunks(<App />)

    // SSR
    const html = renderToString(jsx)

    res.set('content-type', 'text/html')
    res.send(`<!DOCTYPE html>
<html lang='ja'>
<head>
<meta charset='utf-8' />
<meta name='viewport' content='width=device-width, initial-scale=1' />
</head>
<body>
  <div id="root">${html}</div>
  <script id="initial-data">window.__STATE__=${JSON.stringify(initialData)}</script>
</body>
</html>`)
  },
)

// サーバを起動
app.listen(8080, () => console.log('Server started http://localhost:8080'))