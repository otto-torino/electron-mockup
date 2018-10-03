import { createReducer, createActions } from 'reduxsauce'
import Tour from '../Services/Tour'
import CommentsService from '../Services/Comments'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  toggleRevisionSidebar: null,
  toggleCommentsSidebar: null,
  openChangelogModal: null,
  closeChangelogModal: null,
  openDocumentsModal: null,
  closeDocumentsModal: null,
  openRawModal: null,
  closeRawModal: null,
  openAnalyticsModal: null,
  closeAnalyticsModal: null,
  setHomeTourComplete: null,
  setRevisionTourComplete: null,
  runHomeTour: null,
  runRevisionTour: null,
  setRevisionCommentsVisit: ['revisionId']
})

export const UiTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  revisionSidebarOpen: false,
  commentsSidebarOpen: false,
  changelogModalOpen: false,
  documentsModalOpen: false,
  rawModalOpen: false,
  analyticsModalOpen: false,
  runHomeTour: !Tour.isHomeComplete(),
  runRevisionTour: !Tour.isRevisionComplete(),
  commentsVisits: CommentsService.get()
}

/* ------------- Reducers ------------- */

// we start up the application
export const toggleRevisionSidebar = state =>
  Object.assign({}, state, { revisionSidebarOpen: !state.revisionSidebarOpen })
export const toggleCommentsSidebar = state =>
  Object.assign({}, state, { commentsSidebarOpen: !state.commentsSidebarOpen })
export const openChangelogModal = state =>
  Object.assign({}, state, { changelogModalOpen: true })
export const closeChangelogModal = state =>
  Object.assign({}, state, { changelogModalOpen: false })
export const openDocumentsModal = state =>
  Object.assign({}, state, { documentsModalOpen: true })
export const closeDocumentsModal = state =>
  Object.assign({}, state, { documentsModalOpen: false })
export const openRawModal = state =>
  Object.assign({}, state, { rawModalOpen: true })
export const closeRawModal = state =>
  Object.assign({}, state, { rawModalOpen: false })
export const openAnalyticsModal = state =>
  Object.assign({}, state, { analyticsModalOpen: true })
export const closeAnalyticsModal = state =>
  Object.assign({}, state, { analyticsModalOpen: false })
export const setHomeTourComplete = state => {
  // local storage
  Tour.setHomeComplete()
  return Object.assign({}, state, { runHomeTour: false })
}
export const setRevisionTourComplete = state => {
  // local storage
  Tour.setRevisionComplete()
  return Object.assign({}, state, { runRevisionTour: false })
}
export const runHomeTour = state =>
  Object.assign({}, state, { runHomeTour: true })
export const runRevisionTour = state =>
  Object.assign({}, state, { runRevisionTour: true })
export const setRevisionCommentsVisit = (state, {revisionId}) => {
  // local storage
  CommentsService.saveVisit(revisionId)
  return Object.assign({}, state, { commentsVisits: CommentsService.get() })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_REVISION_SIDEBAR]: toggleRevisionSidebar,
  [Types.TOGGLE_COMMENTS_SIDEBAR]: toggleCommentsSidebar,
  [Types.OPEN_CHANGELOG_MODAL]: openChangelogModal,
  [Types.CLOSE_CHANGELOG_MODAL]: closeChangelogModal,
  [Types.OPEN_DOCUMENTS_MODAL]: openDocumentsModal,
  [Types.CLOSE_DOCUMENTS_MODAL]: closeDocumentsModal,
  [Types.OPEN_RAW_MODAL]: openRawModal,
  [Types.CLOSE_RAW_MODAL]: closeRawModal,
  [Types.OPEN_ANALYTICS_MODAL]: openAnalyticsModal,
  [Types.CLOSE_ANALYTICS_MODAL]: closeAnalyticsModal,
  [Types.SET_HOME_TOUR_COMPLETE]: setHomeTourComplete,
  [Types.SET_REVISION_TOUR_COMPLETE]: setRevisionTourComplete,
  [Types.RUN_HOME_TOUR]: runHomeTour,
  [Types.RUN_REVISION_TOUR]: runRevisionTour,
  [Types.SET_REVISION_COMMENTS_VISIT]: setRevisionCommentsVisit
})
