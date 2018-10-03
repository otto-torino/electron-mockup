/**
 * Now basing token authentication only on cookies!
 * token in the store and in the localStorage is not used inside authorization header,
 * in order to avoid de-sync of cookie and stored value!
 * The server sets and invalidates the cookie on login and logout, so there is no need
 * to pass the token through authorization header.
 *
 * I need an unique source of truth for authentication: this source is cookie.
 * I must use cookies over token stored in localStorage and passed in authorization http header
 * because I must support authentication also when accessing static resources
 * directly and not through api calls (mockup files, which are private)
 *
 * So I can't rely upon localStorage saved cookie because it can be different from
 * the cookie one (for example when switching between production and dev api), causing
 * inconsistencies between isAuthenticated store property and the previous token property.
 *
 * I save the token in the store and in the locaStorage because I need it when
 * asking for a refresh, this is the only case this token is used
 *
 * The property loggedIn in the store acts only as a flag in order to detect if the user
 * has done a login action. In fact if the user made a login we need to redirect him after
 * whoami success action! While if the user didn't made a login such redirect shouldn't occurr!
 * (for example when reloading a page)
 *
 * Also I need whoami after login because django rest framework jwt does not return user data
 * in response to a login call!
 */
import { createReducer, createActions } from 'reduxsauce'
import JWT from '../Services/JWT'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['userName', 'password'],
  loginSuccess: ['tokenData'],
  loginFailure: ['error'],
  refreshTokenRequest: null,
  refreshTokenSuccess: ['tokenData'],
  refreshTokenFailure: ['error'],
  logoutRequest: null,
  logoutSuccess: null,
  logoutFailure: null,
  loginLoad: [],
  loginLoadSuccess: [],
  whoamiRequest: null,
  whoamiSuccess: ['userData'],
  whoamiFailure: ['error'],
  reset: null
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  isAuthenticated: false,
  token: JWT.get(),
  userId: null,
  userName: null,
  userEmail: null,
  isSuperUser: false,
  error: null,
  fetching: false,
  loggedIn: false, // should redirect after whoami?
  loading: false
}

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = state => Object.assign({}, state, { fetching: true, error: null })

// we've successfully logged in
export const success = (state, data) => {
  const { token } = data.tokenData
  JWT.save(token)
  return Object.assign({}, state, {
    fetching: false,
    error: null,
    loggedIn: true,
    token
    // isAuthenticated: true // it is whoami that says if I'm authenticated
  })
}

// we've had a problem logging in
export const failure = (state, { error }) =>
  Object.assign({}, state, {
    fetching: false,
    error,
    token: null,
    userId: null,
    userName: null,
    isAuthenticated: false,
    loggedIn: false
  })

// we're attempting to ask whoami
export const whoamiRequest = state => Object.assign({}, state, { fetching: true })

// we've successfully logged in
export const whoamiSuccess = (state, data) => {
  const userData = data.userData
  return Object.assign({}, state, {
    fetching: false,
    error: null,
    isAuthenticated: !!(userData && userData.userId) || false,
    userId: userData ? userData.userId : null,
    userName: userData ? userData.userName : null,
    userEmail: userData ? userData.userEmail : null,
    userdId: userData ? userData.userId : null,
    isSuperUser: userData ? userData.isSuperUser : false
  })
}

// we've had a problem logging in
export const whoamiFailure = (state, { error }) =>
  Object.assign({}, state, {
    fetching: false,
    error,
    userId: null,
    userName: null,
    userEmail: null,
    isAuthenticated: false
  })

// we're attempting to load user from startup sagas
export const load = state => Object.assign({}, state, { loading: true })

export const loadSuccess = state => Object.assign({}, state, { loading: false })
// we need to logout
export const logoutRequest = state => Object.assign({}, state, { loading: true })
// we've logged out
export const logoutSuccess = state => {
  JWT.delete()
  return Object.assign({}, INITIAL_STATE, {token: null})
}

export const reset = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.REFRESH_TOKEN_REQUEST]: request,
  [Types.REFRESH_TOKEN_SUCCESS]: success,
  [Types.REFRESH_TOKEN_FAILURE]: failure,
  [Types.LOGIN_LOAD]: load,
  [Types.LOGIN_LOAD_SUCCESS]: loadSuccess,
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.WHOAMI_REQUEST]: whoamiRequest,
  [Types.WHOAMI_SUCCESS]: whoamiSuccess,
  [Types.WHOAMI_FAILURE]: whoamiFailure,
  [Types.RESET]: reset
})
