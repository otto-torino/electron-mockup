import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  profileRequest: [],
  profileSuccess: ['profileData'],
  profileFailure: ['error'],
  updateProfileRequest: ['profileId', 'profileData'],
  updateProfileSuccess: ['profileData'],
  updateProfileFailure: ['error']
})

export const ProfileTypes = Types
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
    data: data.profileData[0]
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
  [Types.PROFILE_REQUEST]: request,
  [Types.PROFILE_SUCCESS]: success,
  [Types.PROFILE_FAILURE]: failure,
  [Types.UPDATE_PROFILE_REQUEST]: request,
  [Types.UPDATE_PROFILE_SUCCESS]: success,
  [Types.UPDATE_PROFILE_FAILURE]: failure
})
