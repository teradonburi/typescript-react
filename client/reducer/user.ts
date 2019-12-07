import { AxiosInstance } from 'axios'
import { Store } from 'redux'
import { model } from 'interface'

const LOAD = 'user/LOAD'

// reducerで受け取るactionを定義
interface LoadAction {
  type?: 'user/LOAD';
  users?: model.User[];
}

interface ReduxState {
  users?: model.User[];
}

// 初期化オブジェクト
const initialState: ReduxState = {
  users: [],
}

// reducerの定義（dispatch時にコールバックされる）
export default function reducer(state = initialState, action: LoadAction = {}): ReduxState {
  // actionの種別に応じてstateを更新する
  switch (action.type) {
    case LOAD:
      return {
        users: action.users || state.users,
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
  return (dispatch: Store['dispatch'], _: Store['getState'], client: AxiosInstance): Promise<void> => {
    return client
      .get('/api/users')
      .then(res => res.data)
      .then(users => {
        // dispatchしてreducer呼び出し
        dispatch({ type: LOAD, users })
      })
  }
}