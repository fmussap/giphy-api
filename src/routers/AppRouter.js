import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import Main from '../components/Main'
import NotFoundPage from '../components/NotFoundPage'

export const history = createHistory()

const AppRouter = () => (
  <Router history={history}>
    <div className='main'>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter
