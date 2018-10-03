import { connect } from 'react-redux'
import UiActions from '../Redux/Ui'
import CommentsActions from '../Redux/Comments'
import CommentsSidebar from '../Components/CommentsSidebar'

const mapStateToProps = (state, ownProps) => {
  return {
    isOpen: state.ui.commentsSidebarOpen,
    userId: state.auth.userId,
    isSuperUser: state.auth.isSuperUser,
    comments:
      state.comments.data && state.comments.data[ownProps.revision.id]
        ? state.comments.data[ownProps.revision.id]
        : [],
    isFetching: state.comments.fetching,
    fetchError: state.comments.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    toggleSidebar: () => dispatch(UiActions.toggleCommenSidebar()),
    saveComment: (revisionId, commentData) =>
      dispatch(CommentsActions.saveCommentRequest(revisionId, commentData)),
    saveCommentImage: (revisionId, commentId, commentData) =>
      dispatch(
        CommentsActions.updateCommentRequest(revisionId, commentId, commentData)
      ),
    deleteComment: (revisionId, commentId) =>
      dispatch(CommentsActions.deleteCommentRequest(revisionId, commentId)),
    setRevisionCommentsVisit: (revisionId) => dispatch(UiActions.setRevisionCommentsVisit(revisionId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsSidebar)
