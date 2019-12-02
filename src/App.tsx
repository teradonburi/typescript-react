import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { load } from './reducer/user'


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
type Props = PropsFromRedux

class App extends React.Component<Props, {}> {

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
          {/* 配列形式で返却されるためmapで展開する */}
          {users && users.map((user) => {
            return (
              // ループで展開する要素には一意なkeyをつける（ReactJSの決まり事）
              <div key={user.email}>
                <img src={user.picture.thumbnail} />
                <p>名前:{user.name.first + ' ' + user.name.last}</p>
                <p>性別:{user.gender}</p>
                <p>email:{user.email}</p>
              </div>
            )
          })}
      </div>
    )
  }
}

export default connector(App)