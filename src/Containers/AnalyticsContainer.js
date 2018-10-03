import { connect } from 'react-redux'
import Analytics from '../Components/Analytics'
import UiActions from '../Redux/Ui'

const mapStateToProps = (state) => {
  return {
    analytics: state.analytics,
    isSuperUser: state.auth.isSuperUser,
    isOpen: state.ui.analyticsModalOpen,
    mockups: state.mockups.data
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClose: () => dispatch(UiActions.closeAnalyticsModal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analytics)
