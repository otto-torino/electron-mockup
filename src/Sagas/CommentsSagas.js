import { call, put } from 'redux-saga/effects'
import commentsActions from '../Redux/Comments'
import { callApi } from './CallApiSaga'

// get comments
export function * fetchComments (api, { revisionId }) {
  // request
  const apiCall = call(api.comments, revisionId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    // store in redux store
    yield put(commentsActions.commentsSuccess(revisionId, response.data))
  } else {
    yield put(commentsActions.commentsFailure('WRONG'))
  }
}

// save comment
export function * saveComment (api, { revisionId, commentData }) {
  // request
  const apiCall = call(api.saveComment, revisionId, commentData)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    // store in redux store
    yield put(commentsActions.saveCommentSuccess(revisionId, response.data))
  } else {
    yield put(commentsActions.saveCommentFailure(JSON.stringify(response.data)))
  }
}

// updateComment
export function * updateComment (api, { revisionId, commentId, commentData }) {
  // request
  const apiCall = call(api.updateComment, revisionId, commentId, commentData)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    // store in redux store
    yield put(commentsActions.updateCommentSuccess(revisionId, response.data))
  } else {
    yield put(commentsActions.updateCommentFailure('WRONG'))
  }
}

// save comment
export function * deleteComment (api, { revisionId, commentId }) {
  // request
  const apiCall = call(api.deleteComment, revisionId, commentId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    // store in redux store
    yield put(commentsActions.deleteCommentSuccess(revisionId, response.data))
  } else {
    yield put(commentsActions.deleteCommentFailure('WRONG'))
  }
}
