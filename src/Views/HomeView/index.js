import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NavBar from '../../Containers/NavBarContainer'
import MockupActions from '../../Redux/Mockups'
import ArchivedMockupActions from '../../Redux/ArchivedMockups'
import UiActions from '../../Redux/Ui'
import lastCommentsActions from '../../Redux/LastComments'
import lastUpdatesActions from '../../Redux/LastUpdates'
import { Container, Grid, Segment, Label } from 'semantic-ui-react'
import LastComments from '../../Components/LastComments'
import LastUpdates from '../../Components/LastUpdates'
import Footer from '../../Components/Footer'
import Joyride from 'react-joyride'
import HelpSteps from '../../Help/HomeSteps'
import MockupsDashboard from '../../Components/MockupsDashboard'

import 'react-joyride/lib/react-joyride-compiled.css'
import './styles.css'

class HomeView extends React.Component {
  constructor () {
    super()
    this.runTour = this.runTour.bind(this)
    this.handleTourCallback = this.handleTourCallback.bind(this)
  }

  componentDidMount () {
    this.props.fetchMockups()
    this.props.fetchArchivedMockups()
    this.props.fetchLastComments()
    this.props.fetchLastUpdates()
  }

  handleTourCallback (result) {
    if (result.type === 'finished' || (result.action === 'close' && result.type === 'step:after')) {
      // set as completed
      this.refs['joyride'].reset(true)
      this.props.setHomeTourComplete()
    }
  }

  runTour () {
    this.props.runHomeTour()
  }

  render () {
    return (
      <div className='page-home'>
        <NavBar />
        <Container as='main'>
          <Grid stackable>
            <Grid.Column tablet={16} computer={10}>
              <MockupsDashboard
                mockups={this.props.mockups}
                archivedMockups={this.props.archivedMockups}
                isSuperUser={this.props.isSuperUser}
                isFetchig={this.props.mockupsFetching}
                sendMail={this.props.sendMail}
                archivedSendMail={this.props.archivedSendMail}
              />
            </Grid.Column>
            <Grid.Column tablet={16} computer={6}>
              <Segment className='last-updates-dashboard'>
                <Label ribbon color='yellow'>
                  Last Updates
                </Label>
                <LastUpdates
                  isFetching={this.props.lastUpdatesFetching}
                  revisions={this.props.lastUpdates} />
              </Segment>
              <Segment className='last-comments-dashboard'>
                <Label ribbon color='blue'>
                  Last Comments
                </Label>
                <LastComments
                  isFetching={this.props.lastCommentsFetching}
                  comments={this.props.lastComments} />
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
        <Joyride
          ref='joyride'
          steps={HelpSteps}
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

HomeView.propTypes = {
  mockups: PropTypes.array,
  archivedMockups: PropTypes.array,
  mockupsFetching: PropTypes.bool,
  lastComments: PropTypes.array,
  lastCommentsFetching: PropTypes.bool,
  lastUpdates: PropTypes.array,
  lastUpdatesFetching: PropTypes.bool,
  fetchMockups: PropTypes.func,
  fetchArchivedMockups: PropTypes.func,
  fetchLastComments: PropTypes.func,
  fetchLastUpdates: PropTypes.func,
  isSuperUser: PropTypes.bool,
  sendMail: PropTypes.func,
  archivedSendMail: PropTypes.func,
  runTour: PropTypes.bool,
  setHomeTourComplete: PropTypes.func,
  runHomeTour: PropTypes.func
}

const mapStateToProps = state => {
  return {
    mockups: state.mockups.data,
    archivedMockups: state.archivedMockups.data,
    mockupsFetching: state.mockups.fetching,
    lastComments: state.lastComments.data,
    lastCommentsFetching: state.lastComments.fetching,
    lastUpdates: state.lastUpdates.data,
    lastUpdatesFetching: state.lastUpdates.fetching,
    isSuperUser: state.auth.isSuperUser,
    runTour: state.ui.runHomeTour
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchMockups: () => dispatch(MockupActions.mockupsRequest()),
    fetchArchivedMockups: () => dispatch(ArchivedMockupActions.archivedMockupsRequest()),
    fetchLastComments: () =>
      dispatch(lastCommentsActions.lastCommentsRequest()),
    fetchLastUpdates: () => dispatch(lastUpdatesActions.lastUpdatesRequest()),
    sendMail: (mockupId, data) =>
      dispatch(MockupActions.sendMail(mockupId, data)),
    archivedSendMail: (mockupId, data) =>
      dispatch(ArchivedMockupActions.archivedSendMail(mockupId, data)),
    setHomeTourComplete: () => dispatch(UiActions.setHomeTourComplete()),
    runHomeTour: () => dispatch(UiActions.runHomeTour())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
