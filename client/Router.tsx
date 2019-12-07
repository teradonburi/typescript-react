import React from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'

const UserPage = loadable(() => import(/* webpackPrefetch: true, webpackChunkName: 'userpage' */ './UserPage'))
const NotFound = loadable(() => import(/* webpackPrefetch: true, webpackChunkName: 'notfound' */ './NotFound'))

export const Router: React.SFC = () => (
  <Switch>
    <Route exact path='/' render={(props): JSX.Element => <UserPage bgcolor='#eeeeee' {...props} />} />
    {/* それ以外のパス */}
    <Route component={NotFound} />
  </Switch>
)