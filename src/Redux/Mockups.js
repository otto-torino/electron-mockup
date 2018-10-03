import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  mockupsRequest: [],
  mockupsSuccess: ['mockupsData'],
  mockupsFailure: ['error'],
  sendMail: ['mockupId', 'data']
})

export const MockupsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: null,
  error: null,
  fetching: false,
  loading: false
}

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = state => Object.assign({}, state, { fetching: true })

// we've successfully logged in
export const success = (state, data) => {
  return Object.assign({}, state, {
    fetching: false,
    error: null,
    data: data.mockupsData
  })
}

// we've had a problem logging in
export const failure = (state, { error }) =>
  Object.assign({}, state, {
    fetching: false,
    error,
    data: null
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MOCKUPS_REQUEST]: request,
  [Types.MOCKUPS_SUCCESS]: success,
  [Types.MOCKUPS_FAILURE]: failure
})
