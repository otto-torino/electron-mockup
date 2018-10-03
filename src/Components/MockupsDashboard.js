import React from 'react'
import PropTypes from 'prop-types'
import MockupsIndexTable from './MockupsIndexTable'
import { Segment, Label, Popup, Icon } from 'semantic-ui-react'

class MockupsDashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      status: 'active'
    }
    this.switchStatus = this.switchStatus.bind(this)
  }

  switchStatus () {
    this.setState({
      status: this.state.status === 'active' ? 'archived' : 'active'
    })
  }

  switchButton () {
    let iconName = this.state.status === 'active' ? 'archive' : 'server'
    let popupContent =
      this.state.status === 'active' ? 'Archived mockups' : 'Active mockups'
    return (
      <Popup
        trigger={
          <Icon
            className='switch-mockups-status'
            name={iconName}
            size='large'
            circular
            style={{ cursor: 'pointer' }}
            onClick={this.switchStatus}
          />
        }
        content={popupContent}
        position='top center'
      />
    )
  }

  render () {
    let mockups =
      this.state.status === 'active'
        ? this.props.mockups
        : this.props.archivedMockups
    let sendMail =
      this.state.status === 'active'
        ? this.props.sendMail
        : this.props.archivedSendMail

    return (
      <Segment piled className='projects-dashboard'>
        <Label color='purple' ribbon>
          {mockups ? mockups.length : 0}{' '}
          {this.state.status.substring(0, 1).toUpperCase() +
            this.state.status.substring(1)}{' '}
          Project{(mockups && mockups.length) > 1 ? 's' : ''}
        </Label>
        <MockupsIndexTable
          mockups={mockups}
          isFetching={this.props.isFetching}
          isSuperUser={this.props.isSuperUser}
          sendMail={sendMail}
          switchButton={this.switchButton()}
        />
      </Segment>
    )
  }
}

MockupsDashboard.propTypes = {
  isSuperUser: PropTypes.bool,
  isFetching: PropTypes.bool,
  mockups: PropTypes.array,
  archivedMockups: PropTypes.array,
  sendMail: PropTypes.func,
  archivedSendMail: PropTypes.func
}

export default MockupsDashboard
