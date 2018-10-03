import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mockupActions from '../../Redux/Mockups'
import commentsActions from '../../Redux/Comments'
import UiActions from '../../Redux/Ui'
import NavBar from '../../Containers/NavBarContainer'
import Footer from '../../Components/Footer'
import RevisionIframe from '../../Components/RevisionIframe'
import RevisionSidebar from '../../Containers/RevisionSidebarContainer'
import CommentsSidebar from '../../Containers/CommentsSidebarContainer'
import DocumentsModal from '../../Components/DocumentsModal'
import ChangelogModal from '../../Components/ChangelogModal'
import RawModal from '../../Components/RawModal'
import { Sidebar } from 'semantic-ui-react'
import Joyride from 'react-joyride'
import HelpSteps from '../../Help/RevisionSteps'
import history from '../../history'

import './styles.css'

class MockupRevisionView extends React.Component {
  constructor () {
    super()
    this.runTour = this.runTour.bind(this)
    this.handleTourCallback = this.handleTourCallback.bind(this)
  }

  componentDidMount () {
    this.props.fetchMockups()
    this.props.fetchComments(this.props.match.params.revisionId)

    let hash = document.location.hash

    if (
      hash &&
      hash.substring(1) === 'comments' &&
      !this.props.commentsSidebarOpen
    ) {
      this.props.toggleCommentsSidebar()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.revisionId !== this.props.match.params.revisionId) {
      this.props.fetchComments(nextProps.match.params.revisionId)
    }
  }

  handleTourCallback (result) {
    if (result.type === 'finished' || (result.action === 'close' && result.type === 'step:after')) {
      // set as completed
      this.refs['joyride'].reset(true)
      this.props.setRevisionTourComplete()
    } else if (result.type === 'error:target_not_found') {
      this.refs['joyride'].next()
    }
  }

  runTour () {
    this.props.runRevisionTour()
  }

  getMockupAndRevision () {
    let mockup = this.props.mockups.filter(
      m => m.id === parseInt(this.props.match.params.mockupId, 10)
    )[0]
    let revision = mockup.revisions.filter(
      r => r.id === parseInt(this.props.match.params.revisionId, 10)
    )[0]

    return { mockup, revision }
  }

  render () {
    if (!this.props.mockups) {
      return null
    }

    let { mockup, revision } = this.getMockupAndRevision()

    if (this.props.match.params.revisionId && !revision) {
      // wrong url
      history.push('/')
      return null
    }

    return (
      <div className='page-mockup-revision'>
        <NavBar
          commentsSidebarOpen={this.props.commentsSidebarOpen}
          revisionSidebarOpen={this.props.revisionSidebarOpen}
          mockup={mockup}
        />
        <Sidebar.Pushable as={'div'} className='sidebar-container'>
          <RevisionSidebar mockup={mockup} revision={revision} />
          <CommentsSidebar mockup={mockup} revision={revision} />
          <Sidebar.Pusher>
            <div>
              <main>
                <RevisionIframe mockup={mockup} revision={revision} />
              </main>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <DocumentsModal
          isOpen={this.props.documentsModalOpen}
          documents={mockup.documents}
          onClose={this.props.closeDocumentsModal}
        />
        <ChangelogModal
          isOpen={this.props.changelogModalOpen}
          changelog={mockup.changelog}
          onClose={this.props.closeChangelogModal}
        />
        <RawModal
          isOpen={this.props.rawModalOpen}
          mockup={mockup}
          revision={revision}
          onClose={this.props.closeRawModal}
        />
        <Joyride
          ref='joyride'
          steps={HelpSteps(mockup)}
          callback={this.handleTourCallback}
          run={this.props.runTour}
          autoStart
          type='continuous'
        />
        <Footer onRunTour={this.runTour} />
      </div>
    )
  }
}

MockupRevisionView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      mockupId: PropTypes.string,
      revisionId: PropTypes.string
    })
  }),
  fetchMockups: PropTypes.func,
  fetchComments: PropTypes.func,
  mockups: PropTypes.array,
  commentsSidebarOpen: PropTypes.bool,
  revisionSidebarOpen: PropTypes.bool,
  toggleCommentsSidebar: PropTypes.func,
  documentsModalOpen: PropTypes.bool,
  closeDocumentsModal: PropTypes.func,
  changelogModalOpen: PropTypes.bool,
  closeChangelogModal: PropTypes.func,
  rawModalOpen: PropTypes.bool,
  closeRawModal: PropTypes.func,
  runTour: PropTypes.bool,
  setRevisionTourComplete: PropTypes.func,
  runRevisionTour: PropTypes.func
}

const mapStateToProps = state => {
  return {
    mockups: state.mockups.data,
    commentsSidebarOpen: state.ui.commentsSidebarOpen,
    revisionSidebarOpen: state.ui.revisionSidebarOpen,
    documentsModalOpen: state.ui.documentsModalOpen,
    changelogModalOpen: state.ui.changelogModalOpen,
    rawModalOpen: state.ui.rawModalOpen,
    runTour: state.ui.runRevisionTour
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchMockups: () => dispatch(mockupActions.mockupsRequest()),
    fetchComments: revisionId =>
      dispatch(commentsActions.commentsRequest(revisionId)),
    toggleCommentsSidebar: () => dispatch(UiActions.toggleCommentsSidebar()),
    closeDocumentsModal: () => dispatch(UiActions.closeDocumentsModal()),
    closeChangelogModal: () => dispatch(UiActions.closeChangelogModal()),
    closeRawModal: () => dispatch(UiActions.closeRawModal()),
    setRevisionTourComplete: () => dispatch(UiActions.setRevisionTourComplete()),
    runRevisionTour: () => dispatch(UiActions.runRevisionTour())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MockupRevisionView)
