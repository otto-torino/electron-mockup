import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mockupActions from '../../Redux/Mockups'
import RevisionIframe from '../../Components/RevisionIframeFullscreen'
import { Loader, Header, Icon } from 'semantic-ui-react'
import history from '../../history'

import './styles.css'

class MockupRawRevisionView extends React.Component {
  constructor () {
    super()
    this.state = {
      fullscreenEnabled: false
    }
    this.goFullScreen = this.goFullScreen.bind(this)
    this.onFullScreenChange = this.onFullScreenChange.bind(this)
  }

  componentDidMount () {
    // fetch only if necessary
    if (!this.props.mockups) {
      this.props.fetchMockups()
    }

    if (document.addEventListener) {
      document.addEventListener(
        'webkitfullscreenchange',
        this.onFullScreenChange,
        false
      )
      document.addEventListener(
        'mozfullscreenchange',
        this.onFullScreenChange,
        false
      )
      document.addEventListener(
        'fullscreenchange',
        this.onFullScreenChange,
        false
      )
      document.addEventListener(
        'MSFullscreenChange',
        this.onFullScreenChange,
        false
      )
    }
  }

  onFullScreenChange () {
    if (
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      this.setState({ fullscreenEnabled: false })
    } else {
      setTimeout(() => this.setState({ fullscreenEnabled: true }), 1000)
    }
  }

  goFullScreen () {
    if (
      !document.fullscreenElement && // alternative standard method
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    }
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
    if (this.props.isFetching || !this.props.mockups) {
      return (
        <div style={{ marginTop: '2rem', height: '160px' }}>
          <Loader active content='Loading' size='medium' />
        </div>
      )
    }

    if (!this.state.fullscreenEnabled) {
      return (
        <main
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000'
          }}
        >
          <Header as='h2' icon inverted textAlign='center'>
            <Icon name='maximize' circular onClick={this.goFullScreen} />
            <Header.Content>Go FullScreen</Header.Content>
          </Header>
        </main>
      )
    }

    let { mockup, revision } = this.getMockupAndRevision()

    if (this.props.match.params.revisionId && !revision) {
      // wrong url
      history.push('/')
      return null
    }

    return (
      <div className='page-mockup-raw-revision' style={{ backgroundColor: mockup.backgroundColor }}>
        <RevisionIframe mockup={mockup} revision={revision} />
      </div>
    )
  }
}

MockupRawRevisionView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      mockupId: PropTypes.string,
      revisionId: PropTypes.string
    })
  }),
  fetchMockups: PropTypes.func,
  mockups: PropTypes.array,
  isFetching: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    mockups: state.mockups.data,
    mockupsFetching: state.mockups.fetching
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchMockups: () => dispatch(mockupActions.mockupsRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  MockupRawRevisionView
)
