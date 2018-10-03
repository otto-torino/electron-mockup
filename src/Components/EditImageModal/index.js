import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import ImageSketch from '../ImageSketch'

class EditImageModal extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    let title = 'Edit image'
    return (
      <Modal
        open={this.props.isOpen}
        size='fullscreen'
        onClose={this.props.onClose}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <Modal.Description
            style={{
              overflow: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <ImageSketch image={this.props.image} onSave={this.props.onSave} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

EditImageModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  image: PropTypes.shape({
    url: PropTypes.string,
    dimensions: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number
    }),
    dataUri: PropTypes.string
  }),
  onSave: PropTypes.func
}

export default EditImageModal
