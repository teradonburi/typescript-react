import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { loadableReady } from '@loadable/component'
import client from 'axios'
import thunk from 'redux-thunk'

import reducer from './reducer/reducer'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R
  }
  interface NodeModule { 
     hot: { 
      accept(dependency: string, callback:() => void): void; 
     }
  }
}

// redux-devtoolの設定
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// axiosをthunkの追加引数に加える
const thunkWithClient = thunk.withExtraArgument(client)
// redux-thunkをミドルウェアに適用
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkWithClient)))

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate

const render = async () => {
  const { Router } = await import(/* webpackMode: "eager" */ './Router')

  renderMethod(
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>,
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