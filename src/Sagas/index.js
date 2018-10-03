import { takeLatest, all } from 'redux-saga/effects'
import { AuthTypes } from '../Redux/Auth'
import { ProfileTypes } from '../Redux/Profile'
import { MockupsTypes } from '../Redux/Mockups'
import { ArchivedMockupsTypes } from '../Redux/ArchivedMockups'
import { LastCommentsTypes } from '../Redux/LastComments'
import { CommentsTypes } from '../Redux/Comments'
import { LastUpdatesTypes } from '../Redux/LastUpdates'
import { login, logout, loginLoad, whoami, refreshToken } from './AuthSagas'
import { fetchProfile, updateProfile } from './ProfileSagas'
import { fetchMockups, sendMail } from './MockupSagas'
import { fetchArchivedMockups, archivedSendMail } from './ArchivedMockupSagas'
import { fetchLastUpdates } from './LastUpdatesSagas'
import { fetchLastComments } from './LastCommentsSagas'
import { fetchComments, saveComment, updateComment, deleteComment } from './CommentsSagas'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/Startup'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'

/* ------------- API ------------- */

const api = API.create()

export default function * root (dispatch) {
  yield all([
    // AUTH
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(AuthTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(AuthTypes.LOGIN_REQUEST, login, api),
    takeLatest(AuthTypes.REFRESH_TOKEN_REQUEST, refreshToken, api),
    takeLatest(AuthTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(AuthTypes.WHOAMI_REQUEST, whoami, api, dispatch),
    // PROFILE
    takeLatest(ProfileTypes.PROFILE_REQUEST, fetchProfile, api),
    takeLatest(ProfileTypes.UPDATE_PROFILE_REQUEST, updateProfile, api),
    // MOCKUPS
    takeLatest(MockupsTypes.MOCKUPS_REQUEST, fetchMockups, api),
    takeLatest(LastCommentsTypes.LAST_COMMENTS_REQUEST, fetchLastComments, api),
    takeLatest(LastUpdatesTypes.LAST_UPDATES_REQUEST, fetchLastUpdates, api),
    takeLatest(MockupsTypes.SEND_MAIL, sendMail, api),
    takeLatest(ArchivedMockupsTypes.ARCHIVED_MOCKUPS_REQUEST, fetchArchivedMockups, api),
    takeLatest(ArchivedMockupsTypes.ARCHIVED_SEND_MAIL, archivedSendMail, api),
    // REVISION
    takeLatest(CommentsTypes.COMMENTS_REQUEST, fetchComments, api),
    takeLatest(CommentsTypes.SAVE_COMMENT_REQUEST, saveComment, api),
    takeLatest(CommentsTypes.UPDATE_COMMENT_REQUEST, updateComment, api),
    takeLatest(CommentsTypes.DELETE_COMMENT_REQUEST, deleteComment, api)
  ])
}

// export this api instance in order to be used elsewhere. This is the unique api instance which
// has the authorization token set
export {api}
