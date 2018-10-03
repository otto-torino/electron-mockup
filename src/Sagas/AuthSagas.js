import { call, put, select } from 'redux-saga/effects'
import AuthActions from '../Redux/Auth'
import ProfileActions from '../Redux/Profile'
import StartupActions from '../Redux/Startup'
import history from '../history'
import config from '../Config'
import Dispatcher from '../Utils/Dispatcher'

export const selectAuthToken = state => state.auth.token

var refreshInterval = null

// attempts to login
export function * login (api, { userName, password }) {
  // request
  const response = yield call(api.login, userName, password)

  // success?
  if (response.ok) {
    // set token in the api requests header
    // yield call(api.setAuthToken, response.data.token)
    // store auth data in redux store
    yield put(AuthActions.loginSuccess(response.data))
    Dispatcher.emit('loginSuccess')
    yield put(AuthActions.whoamiRequest())
  } else {
    yield put(AuthActions.loginFailure(response.data.nonFieldErrors[0]))
  }
}

// attempts to refreshToken
export function * refreshToken (api) {
  const token = yield select(state => state.auth.token)
  // request
  const response = yield call(api.refreshToken, token)

  // success?
  if (response.ok) {
    // set token in the api requests header
    yield call(api.setAuthToken, response.data.token)
    // store auth data in redux store
    yield put(AuthActions.refreshTokenSuccess(response.data))
  } else {
    yield put(AuthActions.refreshTokenFailure('cannot refresh token'))
  }
}

// attempts to logout
export function * logout (api) {
  yield call(api.logout)
  yield put(AuthActions.logoutSuccess())
  clearInterval(refreshInterval)
  Dispatcher.emit('logoutSuccess')
  yield history.push('/login')
}

// loads the login // unused now
export function * loginLoad (api) {
  const authToken = yield select(selectAuthToken)
  // only set the token in api headers if we have it
  if (authToken) {
    yield call(api.setAuthToken, authToken)
  }
  yield put(AuthActions.loginLoadSuccess())
}

// whoami?
export function * whoami (api, dispatch) {
  // request
  const response = yield call(api.whoami)

  // success?
  if (response.ok) {
    // store whoami data in redux store
    yield put(AuthActions.whoamiSuccess(response.data))
    const isAuthenticated = yield select(state => state.auth.isAuthenticated)
    const loggedIn = yield select(state => state.auth.loggedIn)
    if (isAuthenticated) {
      // set interval to refresh token
      // the interval will be cleared on logout
      yield put(ProfileActions.profileRequest())
      refreshInterval = yield call(
        setInterval,
        () => {
          dispatch(AuthActions.refreshTokenRequest())
        },
        config.refreshInterval
      )

      Dispatcher.emit('whoamiSuccess')
    }
    if (loggedIn) {
      // goto page user was trying to access, if any
      let redirectUrl
      try {
        redirectUrl = yield select(
          state => state.routing.location.state.from.pathname
        )
      } catch (e) {
        redirectUrl = '/'
      }
      console.log('REDIRECT', redirectUrl)
      history.push(redirectUrl)
    }
    yield put(StartupActions.startupComplete())
  } else {
    // @CHECK do nothing for now because setting an error in the auth store causes the error modal
    // to be displayed in the login view just when loading the page
    // yield put(AuthActions.whoamiFailure('Can\'t retrieve user info'))
    yield put(StartupActions.startupComplete())
  }
}
