import { connect } from 'react-redux'
import NavBar from '../Components/NavBar'
import AuthActions from '../Redux/Auth'
import UiActions from '../Redux/Ui'

const mapStateToProps = (state, ownProps) => {
  return {
    isSuperUser: state.auth.isSuperUser,
    userId: state.auth.userId,
    userName: state.auth.userName,
    userEmail: state.auth.userEmail,
    location: state.routing.location,
    commentSidebarOpen: state.ui.commentSidebarOpen,
    revisionSidebarOpen: state.ui.revisionSidebarOpen,
    mockup: ownProps.mockup,
    comments: state.comments.data,
    commentsVisits: state.ui.commentsVisits
  }
}

// do not open both sidebars together!
let toggle = (dispatch, s, props) => {
  let methods = {commentsSidebar: 'toggleCommentsSidebar', revisionSidebar: 'toggleRevisionSidebar'}
  let sOpen = props[s + 'Open']
  let oth = s === 'commentsSidebar' ? 'revisionSidebar' : 'commentsSidebar'
  let othOpen = props[oth + 'Open']
  console.log(props, oth, othOpen)
  if (!sOpen && othOpen) {
    dispatch(UiActions[methods[oth]]())
  }
  dispatch(UiActions[methods[s]]())
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSignOut: () => dispatch(AuthActions.logoutRequest()),
    // toggleRevisionSidebar: () => dispatch(UiActions.toggleRevisionSidebar()),
    // toggleCommentsSidebar: () => dispatch(UiActions.toggleCommentsSidebar())
    toggleRevisionSidebar: () => toggle(dispatch, 'revisionSidebar', ownProps),
    toggleCommentsSidebar: () => toggle(dispatch, 'commentsSidebar', ownProps),
    openChangelogModal: () => dispatch(UiActions.openChangelogModal()),
    openDocumentsModal: () => dispatch(UiActions.openDocumentsModal()),
    openRawModal: () => dispatch(UiActions.openRawModal()),
    openAnalyticsModal: () => dispatch(UiActions.openAnalyticsModal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
