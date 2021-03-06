import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  lastCommentsRequest: [],
  lastCommentsSuccess: ['lastCommentsData'],
  lastCommentsFailure: ['error']
})

export const LastCommentsTypes = Types
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
    data: data.lastCommentsData
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
  [Types.LAST_COMMENTS_REQUEST]: request,
  [Types.LAST_COMMENTS_SUCCESS]: success,
  [Types.LAST_COMMENTS_FAILURE]: failure
})
