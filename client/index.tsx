import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { loadableReady } from '@loadable/component'
import client from 'axios'
import thunk from 'redux-thunk'

import reducer from './reducer/reducer'
import theme from './theme'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R,
    __STATE__: {}
  }
  interface NodeModule { 
     hot: { 
      accept(dependency: string, callback:() => void): void; 
     }
  }
}

// バックエンドで埋め込んだRedux Storeのデータを取得する
const initialData = window.__STATE__ || {}
delete window.__STATE__
const dataElem = document.getElementById('initial-data')
if (dataElem && dataElem.parentNode) dataElem.parentNode.removeChild(dataElem)

// redux-devtoolの設定
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// axiosをthunkの追加引数に加える
const thunkWithClient = thunk.withExtraArgument(client)
// redux-thunkをミドルウェアに適用
const store = createStore(reducer, initialData, composeEnhancers(applyMiddleware(thunkWithClient)))

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate

const render = async () => {

  React.useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      // フロントエンドでもMaterial-UIのスタイルを再生成するため削除する
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  const { Router } = await import(/* webpackMode: "eager" */ './Router')

  renderMethod(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>,
    document.getElementById('root')
  )
}


loadableReady(() => {
  render()
})

if (module.hot) {
  module.hot.accept('./Router', () => {
    render()
  })
}