import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Icon } from 'semantic-ui-react'

class Analytics extends React.Component {
  textualPosition (path) {
    if (path === '/') {
      return 'home'
    }

    // should be unnecessary
    if (path === '/login') {
      return 'login'
    }

    let reRevisionDetail = new RegExp('/mockup/([0-9]*)/revision/([0-9]*)')
    let revisionDetailMatches = path.match(reRevisionDetail)
    if (revisionDetailMatches) {
      let mockup = this.props.mockups.filter(
        m => m.id === parseInt(revisionDetailMatches[1], 10)
      )[0]
      let revision = mockup.revisions.filter(
        r => r.id === parseInt(revisionDetailMatches[2], 10)
      )[0]
      if (!mockup || !revision) {
        return 'WRONG URL'
      } else {
        return `${mockup.name}, rev. ${revision.revision}`
      }
    }

    let reRawRevisionDetail = new RegExp(
      '/mockup/raw/([0-9]*)/revision/([0-9]*)'
    )
    let rawRevisionDetailMatches = path.match(reRawRevisionDetail)
    if (rawRevisionDetailMatches) {
      let mockup = this.props.mockups.filter(
        m => m.id === parseInt(rawRevisionDetailMatches[1], 10)
      )[0]
      let revision = mockup.revisions.filter(
        r => r.id === parseInt(rawRevisionDetailMatches[2], 10)
      )[0]

      if (!mockup || !revision) {
        return `WRONG URL, mockupId: ${rawRevisionDetailMatches[1]}, revisionId: ${rawRevisionDetailMatches[2]}`
      } else {
        return `Raw: ${mockup.name}, rev. ${revision.revision}`
      }
    }
  }

  positionTable (positionKeys) {
    if (!positionKeys.length) return null
    return (
      <div>
        <p>
          <Icon name='info' />
          If you see multiple "Locations" for an user, it means that the user has multiple browser tabs or windows
          opened at once.
        </p>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>User</Table.HeaderCell>
              <Table.HeaderCell>Locations</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {positionKeys.map((username, index) => {
              let positions = this.props.analytics.positions[username]
              return (
                <Table.Row key={'table-row-analytics' + index}>
                  <Table.Cell>
                    <h4>{username}</h4>
                  </Table.Cell>
                  <Table.Cell>
                    {Object.keys(positions).map(clientId => {
                      return (
                        <p key={'client-id-' + clientId}>{this.textualPosition(positions[clientId])}</p>
                      )
                    })}
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </div>
    )
  }

  render () {
    if (!this.props.isSuperUser || !this.props.mockups) {
      return null
    }
    let positionKeys = Object.keys(this.props.analytics.positions)
    let onlineIconName = 'user outline'
    if (positionKeys.length === 1) onlineIconName = 'user'
    else if (positionKeys.length > 1) onlineIconName = 'users'

    return (
      <Modal open={this.props.isOpen} size='small' onClose={this.props.onClose}>
        <Modal.Header>Analytics</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>
              <Icon name={onlineIconName} />
              {positionKeys.length} user{positionKeys.length === 1 ? '' : 's'}
              {' '}online
            </p>
            {this.positionTable(positionKeys)}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

Analytics.propTypes = {
  isSuperUser: PropTypes.bool,
  analytics: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  mockups: PropTypes.array
}

export default Analytics
