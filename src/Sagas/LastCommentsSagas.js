import { call, put } from 'redux-saga/effects'
import lastCommentsActions from '../Redux/LastComments'
import { callApi } from './CallApiSaga'

// get last comments
export function * fetchLastComments (api) {
  // request
  const apiCall = call(api.lastComments)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    // store whoami data in redux store
    yield put(lastCommentsActions.lastCommentsSuccess(response.data))
  } else {
    yield put(lastCommentsActions.lastCommentsFailure('WRONG'))
  }
}
