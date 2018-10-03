import { put } from 'redux-saga/effects'
import AuthActions from '../Redux/Auth'

// process STARTUP actions
export function * startup (action) {
  // load the token saved in the redux store
  console.log('STARTUP', 'load token')
  yield put(AuthActions.loginLoad())
  console.log('STARTUP', 'whoami')
  yield put(AuthActions.whoamiRequest())
}
