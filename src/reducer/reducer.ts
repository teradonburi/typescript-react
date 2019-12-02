import { combineReducers } from 'redux'
// 作成したuserのreducer
import user from './user'

// 作成したreducerをオブジェクトに追加していく
// combineReducersで１つにまとめてくれる
export default combineReducers({
  user,
})