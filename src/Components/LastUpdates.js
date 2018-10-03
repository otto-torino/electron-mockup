import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { List, Loader } from 'semantic-ui-react'
import { revisionRoute } from '../Utils/Routes'

class LastUpdates extends React.Component {
  render () {
    if (this.props.isFetching && !this.props.revisions) {
      return (
        <div style={{ marginTop: '2rem', height: '160px' }}>
          <Loader active content='Loading' size='medium' />
        </div>
      )
    }
    if (!this.props.revisions || !this.props.revisions.length) {
      return (
        <div style={{ marginTop: '2rem' }}>
          <p>No updates.</p>
        </div>
      )
    }
    return (
      <div style={{ marginTop: '2rem' }}>
        <List divided relaxed>
          {this.props.revisions.map(revision => {
            return (
              <List.Item key={'last-update-' + revision.id}>
                <List.Icon name='code' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='span'>
                    <Link to={revisionRoute(revision.mockup.id, revision.id)}>
                      {revision.mockup.name} rev. {revision.revision}
                    </Link>
                  </List.Header>
                  <List.Description as='a' className='list-description'>
                    Updated {moment(revision.lastEditDate).fromNow()}
                  </List.Description>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </div>
    )
  }
}

LastUpdates.propTypes = {
  revisions: PropTypes.array,
  isFetching: PropTypes.bool
}

export default LastUpdates
