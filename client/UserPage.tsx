import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { load } from './reducer/user'
import { Link } from "react-router-dom"
import { Helmet } from 'react-helmet'

interface RootState {
  user: { users: [any] }
}

// connectでwrap
const connector = connect(
  // propsに受け取るreducerのstate
  (state: RootState) => ({
    users: state.user.users
  }),
  // propsに付与するactions
  { load }
)

type PropsFromRedux = ConnectedProps<typeof connector>
// propsの型
type Props = PropsFromRedux & {}
// stateの型
type State = {}

class UserPage extends React.Component<Props, State> {

  componentDidMount() {
    // user取得APIコールのactionをキックする
    this.props.load()
  }

  render () {
    const { users } = this.props
    // 初回はnullが返ってくる（initialState）、処理完了後に再度結果が返ってくる
    console.log(users)
    return (
      <div>
        <Helmet>
          <title>ユーザページ</title>
          <meta name='description' content='ユーザページのdescriptionです' />
        </Helmet>
        {/* 配列形式で返却されるためmapで展開する */}
        {users && users.map((user) => {
          return (
            // ループで展開する要素には一意なkeyをつける（ReactJSの決まり事）
            <div key={user.email}>
              <img src={user.picture.thumbnail} />
              <p>名前:{user.name.first + ' ' + user.name.last}</p>
              <p>性別:{user.gender}</p>
              <p>email:{user.email}</p>
              <Link to='/hoge'>あぼーん</Link>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connector(UserPage)