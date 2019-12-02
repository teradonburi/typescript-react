import { AxiosInstance } from 'axios'
import { Store } from 'redux'

const LOAD = 'user/LOAD'

// reducerで受け取るactionを定義
interface Action {
  type?: 'user/LOAD',
  results?: any,
}


// 初期化オブジェクト
const initialState = {
  users: null,
}

// reducerの定義（dispatch時にコールバックされる）
export default function reducer(state = initialState, action: Action = {}){
  // actionの種別に応じてstateを更新する
  switch (action.type) {
    case LOAD:
      return {
        users: action.results,
      }
    default:
      // 初期化時はここに来る（initialStateのオブジェクトが返却される）
      return state
  }
}

// actionの定義
export function load() {
  // clientはaxiosの付与したクライアントパラメータ（後述）
  // 非同期処理をPromise形式で記述できる
  return (dispatch: Store["dispatch"], getState: Store["getState"], client: AxiosInstance) => {
    return client
      .get('https://randomuser.me/api/')
      .then(res => res.data)
      .then(data => {
        const results = data.results
        // dispatchしてreducer呼び出し
        dispatch({ type: LOAD, results })
      })
  }
}