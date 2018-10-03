import React from 'react'
import moment from 'moment'
import md5 from 'js-md5'
import PropTypes from 'prop-types'
import { Sidebar, Comment, Icon, Header, Button, Loader, Modal } from 'semantic-ui-react'
import config from '../../Config'
import CommentFormModal from '../CommentFormModal'
import EditImageModal from '../EditImageModal'
import getIconName from '../../Utils/ExtensionToIcon'
import ReactMarkdown from 'react-markdown'

class CommentsSidebar extends React.Component {
  constructor () {
    super()
    this._canShowError = true
    this.state = {
      formModalOpen: false,
      formModalReplyTo: null,
      editImageModalOpen: false,
      editImage: null,
      editImageCommentId: null,
      errorModalOpen: false
    }
  }

  componentWillReceiveProps (nextProps) {
    // show errors only when fresh arrived from API!
    if (nextProps.fetchError && !nextProps.isFetching) {
      this.setState({ errorModalOpen: true })
      this._canShowError = false
    }
    if (nextProps.isFetching) {
      this._canShowError = true
    }
    if (nextProps.isOpen && !this.props.isOpen) {
      this.props.setRevisionCommentsVisit(this.props.revision.id)
    }
  }

  saveCommentImage () {
    return imageDataUri => {
      this.props.saveCommentImage(
        this.props.revision.id,
        this.state.editImageCommentId,
        { filename: this.state.editImage.name, file: imageDataUri }
      )
    }
  }

  openFormModal (replyTo) {
    return () => {
      this.setState({
        formModalOpen: true,
        formModalReplyTo: replyTo
      })
    }
  }

  onDelete (commentId) {
    return () => {
      this.props.deleteComment(this.props.revision.id, commentId)
    }
  }

  fileElement (comment) {
    let inner = (
      <div>
        <Icon name={getIconName(comment.fileExtension)} /> {comment.filename}
      </div>
    )
    if (comment.fileIsImage) {
      return (
        <div>
          <Comment.Action
            as='a'
            onClick={() =>
              this.setState({
                editImageModalOpen: true,
                editImage: {
                  name: comment.filename,
                  url: comment.file,
                  dimensions: comment.imageDimensions,
                  dataUri: comment.imageDataUri
                },
                editImageCommentId: comment.id
              })
            }
            style={{ cursor: 'pointer' }}
          >
            {inner}
          </Comment.Action>
        </div>
      )
    } else {
      return (
        <div>
          <Comment.Action as='a' href={comment.file} target='_blank'>
            {inner}
          </Comment.Action>
        </div>
      )
    }
  }
  // print comment recursion
  printComment (comment) {
    return (
      <Comment key={'comment' + comment.id}>
        <Comment.Avatar
          src={
            'https://www.gravatar.com/avatar/' +
            md5(comment.author.eMail) +
            '?d=' +
            config.defaultGravatar
          }
        />
        <Comment.Content>
          <Comment.Author as='a'>{comment.author.userName}</Comment.Author>
          <Comment.Metadata>
            <div>{moment(comment.insertionDate).format('LLL')}</div>
          </Comment.Metadata>
          <Comment.Text>
            <ReactMarkdown source={comment.text} />
            {comment.filename ? this.fileElement(comment) : null}
          </Comment.Text>
          <Comment.Actions>
            <Comment.Action as='a' onClick={this.openFormModal(comment)}>
              <Icon name='reply' />
              reply
            </Comment.Action>
            {(comment.author.userId === this.props.userId ||
              this.props.isSuperUser) &&
            !comment.children.length ? (
              <Comment.Action as='a' onClick={this.onDelete(comment.id)}>
                  <Icon name='remove' />
                delete
                </Comment.Action>
              ) : null}
          </Comment.Actions>
        </Comment.Content>
        {comment.children.length ? (
          <Comment.Group threaded size='small'>
            {comment.children.reverse().map(c => this.printComment(c))}
          </Comment.Group>
        ) : null}
      </Comment>
    )
  }

  render () {
    return (
      <Sidebar
        as={'div'}
        animation='scale down'
        width='very wide'
        visible={this.props.isOpen}
        icon='labeled'
        className='sidebar-comments'
        direction='right'
        style={{ paddingLeft: '16px', paddingRight: '16px' }}
      >
        <Comment.Group threaded size='small'>
          <Header
            as='h5'
            icon
            textAlign='center'
            style={{ paddingTop: '16px' }}
          >
            <Icon name='comment' circular />
            <Header.Content>Comments</Header.Content>
          </Header>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
            onClick={this.openFormModal()}
          >
            <span style={{ marginRight: '8px', cursor: 'pointer' }}>
              Add a comment
            </span>
            <Icon name='plus' style={{ cursor: 'pointer' }} circular />
          </div>
          {this.props.comments.map(comment => this.printComment(comment))}
        </Comment.Group>
        <CommentFormModal
          revision={this.props.revision}
          isOpen={this.state.formModalOpen}
          replyTo={this.state.formModalReplyTo}
          onClose={() => this.setState({ formModalOpen: false })}
          onSave={this.props.saveComment}
          userId={this.props.userId}
        />
        <EditImageModal
          isOpen={this.state.editImageModalOpen}
          onClose={() => this.setState({ editImageModalOpen: false })}
          image={this.state.editImage}
          onSave={this.saveCommentImage()}
        />
        <Modal open={this.props.isFetching} basic size='small'>
          <Modal.Content>
            <Loader active content='Loading' size='huge' />
          </Modal.Content>
        </Modal>
        <Modal open={this.state.errorModalOpen} basic size='small'>
          <Header icon='warning circle' content='API Error!' />
          <Modal.Content>
            <p>{this.props.fetchError}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='grey' inverted onClick={() => this.setState({errorModalOpen: false})}>
              <Icon name='checkmark' /> Close
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    )
  }
}

CommentsSidebar.propTypes = {
  isOpen: PropTypes.bool,
  revision: PropTypes.object,
  comments: PropTypes.array,
  userId: PropTypes.number,
  isSuperUser: PropTypes.bool,
  saveComment: PropTypes.func,
  saveCommentImage: PropTypes.func,
  deleteComment: PropTypes.func,
  isFetching: PropTypes.bool,
  fetchError: PropTypes.string,
  setRevisionCommentsVisit: PropTypes.func
}

export default CommentsSidebar
