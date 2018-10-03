import { call, put } from 'redux-saga/effects'
import lastUpdatesActions from '../Redux/LastUpdates'
import { callApi } from './CallApiSaga'

// get mockups
export function * fetchLastUpdates (api) {
  // request
  const apiCall = call(api.lastUpdates)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    // store whoami data in redux store
    yield put(lastUpdatesActions.lastUpdatesSuccess(response.data))
  } else {
    yield put(lastUpdatesActions.lastUpdatesFailure('WRONG'))
  }
}
