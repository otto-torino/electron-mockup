import React from 'react'
import PropTypes from 'prop-types'
import store from '../Redux/Store'
import history from '../history'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Redirect } from 'react-router-dom'
// views
import HomeView from '../Views/HomeView'
import SettingsView from '../Views/SettingsView'
import MockupRevisionView from '../Views/MockupRevisionView'
import MockupRawRevisionView from '../Views/MockupRawRevisionView'
import LoginView from '../Views/LoginView'
import NetworkError from '../Views/NetworkError'
import Dispatcher from '../Utils/Dispatcher'

/**
 * A wrapper for private routes which redirects to login
 * if user is not authenticated
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    const state = store.getState()
    return state.auth.isAuthenticated
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }}} />
  }} />
)
PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object
}

class AppRouter extends React.Component {
  componentDidMount () {
    this.unlisten = history.listen(location => {
      Dispatcher.emit('locationChanged', location.pathname)
    })
  }

  componentWillUnmount () {
    this.unlisten()
  }

  render () {
    return (
      <ConnectedRouter history={history}>
        <div>
          <PrivateRoute exact path='/' component={HomeView} />
          <PrivateRoute exact path='/settings' component={SettingsView} />
          <PrivateRoute exact path='/mockup/:mockupId/revision/:revisionId' component={MockupRevisionView} />
          <PrivateRoute exact path='/mockup/raw/:mockupId/revision/:revisionId' component={MockupRawRevisionView} />
          <Route path='/login' component={LoginView} />
          <Route path='/network-error' component={NetworkError} />
        </div>
      </ConnectedRouter>
    )
  }
}

export default AppRouter
