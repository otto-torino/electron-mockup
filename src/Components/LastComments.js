import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import md5 from 'js-md5'
import config from '../Config'
import { Comment, Icon, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { revisionRoute } from '../Utils/Routes'

class LastComments extends React.Component {
  render () {
    if (this.props.isFetching && !this.props.comments) {
      return (
        <div style={{ marginTop: '2rem', height: '160px' }}>
          <Loader active content='Loading' size='medium' />
        </div>
      )
    }
    if (!this.props.comments || !this.props.comments.length) {
      return (
        <div style={{ marginTop: '2rem' }}>
          <p>No comments available.</p>
        </div>
      )
    }
    return (
      <div style={{ marginTop: '2rem' }}>
        <Comment.Group size='mini'>
          {this.props.comments.map(comment => {
            return (
              <Comment key={'comment-' + comment.id}>
                <Comment.Avatar
                  src={
                    'https://www.gravatar.com/avatar/' +
                    md5(comment.author.eMail) +
                    '?d=' +
                    config.defaultGravatar
                  }
                />
                <Comment.Content>
                  <Comment.Author as='a'>
                    {comment.author.userName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{moment(comment.insertionDate).format('LLL')}</div>
                  </Comment.Metadata>
                  <Comment.Text>
                    <b>
                      {comment.revision.mockup.name} (rev {comment.revision.revision})
                    </b>
                  </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action as='span'>
                      <Link to={revisionRoute(comment.revision.mockup.id, comment.revision.id) + '#comments'}>
                        <Icon name='eye' />
                        thread →
                      </Link>
                    </Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            )
          })}
        </Comment.Group>
      </div>
    )
  }
}

LastComments.propTypes = {
  comments: PropTypes.array,
  isFetching: PropTypes.bool
}

export default LastComments
