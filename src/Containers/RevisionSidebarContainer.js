import { connect } from 'react-redux'
import UiActions from '../Redux/Ui'
import RevisionSidebar from '../Components/RevisionSidebar'

const mapStateToProps = (state) => {
  return {
    isOpen: state.ui.revisionSidebarOpen
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebar: () => dispatch(UiActions.toggleRevisionSidebar())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevisionSidebar)
