import React from 'react'
import PropTypes from 'prop-types'
import profileActions from '../../Redux/Profile'
import { connect } from 'react-redux'
import md5 from 'js-md5'
import NavBar from '../../Containers/NavBarContainer'
import {
  Container,
  Grid,
  Segment,
  Menu,
  Table,
  Header,
  Image,
  Message,
  Checkbox
} from 'semantic-ui-react'
import { toast } from 'react-toastify'
import config from '../../Config'
import Footer from '../../Components/Footer'

import './styles.css'

const electron = window.require('electron')

class SettingsView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'info'
    }
    this.toggleReleaseNotification = this.toggleReleaseNotification.bind(this)
    this.toggleDocumentNotification = this.toggleDocumentNotification.bind(
      this
    )

    electron.ipcRenderer.on('start-help-tour', event => {
      this.runTour()
    })
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  content () {
    const { activeItem } = this.state
    let content
    switch (activeItem) {
      case 'info':
        content = this.infoContent()
        break
      case 'notifications':
        content = this.infoNotifications()
        break
      default:
        content = this.infoContent()
    }
    return content
  }

  runTour () {
    toast.info('Help tour is not available in this section')
  }

  infoContent () {
    return (
      <Table basic='very' celled collapsing>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' image>
                <Image
                  circular
                  className='navbar-gravatar'
                  src={
                    'https://www.gravatar.com/avatar/' +
                    md5(this.props.userEmail) +
                    '?d=' +
                    config.defaultGravatar
                  }
                />
              </Header>
            </Table.Cell>
            <Table.Cell>{this.props.userName}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4'>
                <Header.Content>User ID</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{this.props.userId}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4'>
                <Header.Content>E-mail</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{this.props.userEmail}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4'>
                <Header.Content>Role</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{this.props.isSuperUser ? 'admin' : 'user'}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }

  toggleReleaseNotification (event, data) {
    const { checked } = data
    this.props.updateProfile(
      profileActions.updateProfileRequest(this.props.profile.id, {
        newReleaseNotification: checked
      })
    )
  }

  toggleDocumentNotification (event, data) {
    const { checked } = data
    this.props.updateProfile(
      profileActions.updateProfileRequest(this.props.profile.id, {
        newDocumentNotification: checked
      })
    )
  }

  infoNotifications () {
    if (!this.props.profile) return null

    const {
      newReleaseNotification,
      newDocumentNotification
    } = this.props.profile

    return (
      <div>
        <Message
          icon='bell'
          header='Set your notifications preferences'
          content='You can enable or disable notifications for your account. Notifications are sent when a new mockup
          revision or document are published. You can set these notification options separately.'
        />
        <Table basic='very' celled collapsing>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                Be notified by e-mail when a new revision is released
              </Table.Cell>
              <Table.Cell>
                <Checkbox
                  toggle
                  label={newReleaseNotification ? 'ON' : 'OFF'}
                  checked={newReleaseNotification}
                  onChange={this.toggleReleaseNotification}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Be notified by e-mail when a new document is published
              </Table.Cell>
              <Table.Cell>
                <Checkbox
                  toggle
                  label={newDocumentNotification ? 'ON' : 'OFF'}
                  checked={newDocumentNotification}
                  onChange={this.toggleDocumentNotification}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }

  render () {
    const { activeItem } = this.state

    return (
      <div className='page-settings'>
        <NavBar />
        <Container as='main'>
          <Grid>
            <Grid.Column stretched width={12}>
              <Segment>{this.content()}</Segment>
            </Grid.Column>

            <Grid.Column width={4}>
              <Menu fluid vertical tabular='right'>
                <Menu.Item
                  name='info'
                  active={activeItem === 'info'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name='notifications'
                  active={activeItem === 'notifications'}
                  onClick={this.handleItemClick}
                />
              </Menu>
            </Grid.Column>
          </Grid>
        </Container>
        <Footer onRunTour={this.runTour} />
      </div>
    )
  }
}

SettingsView.propTypes = {
  isSuperUser: PropTypes.bool,
  userId: PropTypes.number,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  profile: PropTypes.object,
  updateProfile: PropTypes.func
}

const mapStateToProps = state => {
  return {
    isSuperUser: state.auth.isSuperUser,
    userId: state.auth.userId,
    userName: state.auth.userName,
    userEmail: state.auth.userEmail,
    profile: state.profile.data
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateProfile: action => dispatch(action)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView)
