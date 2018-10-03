import { call, put } from 'redux-saga/effects'
import profileActions from '../Redux/Profile'
import { callApi } from './CallApiSaga'

// get profile
export function * fetchProfile (api) {
  // request
  const apiCall = call(api.profile)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(profileActions.profileSuccess(response.data))
  } else {
    yield put(profileActions.profileFailure('WRONG'))
  }
}

// update profile
export function * updateProfile (api, { profileId, profileData }) {
  // request
  const apiCall = call(api.updateProfile, profileId, profileData)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    // store in redux store
    yield put(profileActions.updateProfileSuccess(response.data))
  } else {
    yield put(profileActions.updateProfileFailure('WRONG'))
  }
}
