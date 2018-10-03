import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  commentsRequest: ['revisionId'],
  commentsSuccess: ['revisionId', 'commentsData'],
  commentsFailure: ['error'],
  saveCommentRequest: ['revisionId', 'commentData'],
  saveCommentSuccess: ['revisionId', 'commentsData'],
  saveCommentFailure: ['error'],
  deleteCommentRequest: ['revisionId', 'commentId'],
  deleteCommentSuccess: ['revisionId', 'commentsData'],
  deleteCommentFailure: ['error'],
  updateCommentRequest: ['revisionId', 'commentId', 'commentData'],
  updateCommentSuccess: ['revisionId', 'commentsData'],
  updateCommentFailure: ['error']
})

export const CommentsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: null,
  error: null,
  fetching: false,
  loading: false
}

/* ------------- Reducers ------------- */

// all operations work with the same reducer, so the update is immediate!
// no manual patching of data, no more request to refetch for changes!

// we're attempting to fetch comments
export const request = state => Object.assign({}, state, { fetching: true })

// we've successfully fetched comments
export const success = (state, {revisionId, commentsData}) => {
  return Object.assign({}, state, {
    fetching: false,
    error: null,
    data: Object.assign({}, state.data, {[revisionId]: commentsData})
  })
}

// we've had a problem fetching comments
export const failure = (state, { error }) =>
  Object.assign({}, state, {
    fetching: false,
    error
  })

// @TODO do seriuos stuff with responses
// we're attempting to delete a comment
export const deleteRequest = state => state

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COMMENTS_REQUEST]: request,
  [Types.COMMENTS_SUCCESS]: success,
  [Types.COMMENTS_FAILURE]: failure,
  [Types.SAVE_COMMENT_REQUEST]: request,
  [Types.SAVE_COMMENT_SUCCESS]: success,
  [Types.SAVE_COMMENT_FAILURE]: failure,
  [Types.DELETE_COMMENT_REQUEST]: request,
  [Types.DELETE_COMMENT_SUCCESS]: success,
  [Types.DELETE_COMMENT_FAILURE]: failure,
  [Types.UPDATE_COMMENT_REQUEST]: request,
  [Types.UPDATE_COMMENT_SUCCESS]: success,
  [Types.UPDATE_COMMENT_FAILURE]: failure
})
