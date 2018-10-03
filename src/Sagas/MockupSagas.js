import { call, put } from 'redux-saga/effects'
import mockupsActions from '../Redux/Mockups'
import { callApi } from './CallApiSaga'

// get mockups
export function * fetchMockups (api) {
  // request
  const apiCall = call(api.mockups)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(mockupsActions.mockupsSuccess(response.data))
  } else {
    yield put(mockupsActions.mockupsFailure('WRONG'))
  }
}

export function * sendMail (api, {mockupId, data}) {
  // request
  const apiCall = call(api.sendMail, mockupId, data)
  const response = yield call(callApi, apiCall)
  // const response = api.sendMail(payload.mockupId, payload.data)

  // success?
  if (response.ok) {
    // @TODO notify user in some way
  } else {
    // @TODO notify user in some way
  }
}
