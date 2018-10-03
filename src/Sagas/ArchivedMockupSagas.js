import { call, put } from 'redux-saga/effects'
import ArchivedMockupActions from '../Redux/ArchivedMockups'
import { callApi } from './CallApiSaga'

// get mockups
export function * fetchArchivedMockups (api) {
  // request
  const apiCall = call(api.archivedMockups)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ArchivedMockupActions.archivedMockupsSuccess(response.data))
  } else {
    yield put(ArchivedMockupActions.archivedMockupsFailure('WRONG'))
  }
}

export function * archivedSendMail (api, {mockupId, data}) {
  // request
  const apiCall = call(api.archivedSendMail, mockupId, data)
  const response = yield call(callApi, apiCall)
  // const response = api.sendMail(payload.mockupId, payload.data)

  // success?
  if (response.ok) {
    // @TODO notify user in some way
  } else {
    // @TODO notify user in some way
  }
}
