import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, TextArea, Button, Image } from 'semantic-ui-react'
import UploadButton from './UploadButton'
import MarkdownCheatsheetImage from '../Static/Images/markdown-cheatsheet.jpg'

class CommentFormModal extends React.Component {
  constructor () {
    super()
    this.state = {
      text: '',
      attachment: '',
      showCheatsheet: false
    }

    this.onUpload = this.onUpload.bind(this)
    this.save = this.save.bind(this)
    this.close = this.close.bind(this)
  }

  save () {
    let commentData = {
      revision: this.props.revision.id,
      author: this.props.userId,
      text: this.state.text
    }
    if (this.props.replyTo) {
      commentData.parent = this.props.replyTo.id
    }
    if (this.state.attachment) {
      let reader = new FileReader()
      reader.addEventListener(
        'load',
        () => {
          commentData.file = reader.result
          commentData.filename = this.state.attachment.name
          this.props.onSave(this.props.revision.id, commentData)
          this.close()
        },
        false
      )
      reader.readAsDataURL(this.state.attachment)
    } else {
      this.props.onSave(this.props.revision.id, commentData)
      this.close()
    }
  }

  onUpload (file) {
    console.log(file)
    this.setState({
      attachment: file
    })
  }

  close () {
    this.setState({
      text: '',
      attachment: ''
    })
    this.props.onClose()
  }

  render () {
    let title = this.props.replyTo
      ? 'Reply to ' + this.props.replyTo.author.userName
      : 'New comment'
    let uploadButtonLabel = this.state.attachment
      ? this.state.attachment.name
      : 'Add attachment'
    return (
      <Modal open={this.props.isOpen} size='small' onClose={this.close}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>
              You can use{' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  this.setState({ showCheatsheet: !this.state.showCheatsheet })
                }
              >
                Markdown
              </a>{' '}
              syntax in your text.
            </p>
            <p>
              <Image src={MarkdownCheatsheetImage} hidden={!this.state.showCheatsheet} />
            </p>
            <Form>
              <div className='field'>
                <TextArea
                  autoHeight
                  placeholder='write here your comment...'
                  onChange={(e, { value }) => this.setState({ text: value })}
                />
              </div>
              <div className='field'>
                <UploadButton
                  label={uploadButtonLabel}
                  onUpload={this.onUpload}
                />
              </div>
              <div className='field'>
                <Form.Field onClick={this.save} control={Button}>
                  Send
                </Form.Field>
              </div>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

CommentFormModal.propTypes = {
  isOpen: PropTypes.bool,
  replyTo: PropTypes.object,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  revision: PropTypes.object,
  userId: PropTypes.number
}

export default CommentFormModal
