import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal
} from 'semantic-ui-react'

class ChangelogModal extends React.Component {
  render () {
    return (
      <Modal
        trigger={this.props.trigger}
        open={this.props.isOpen}
        size='small'
        onClose={this.props.onClose}
      >
        <Modal.Header>CHANGELOG</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div dangerouslySetInnerHTML={{ __html: this.props.changelog }} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

ChangelogModal.propTypes = {
  trigger: PropTypes.object,
  isOpen: PropTypes.bool,
  changelog: PropTypes.string,
  onClose: PropTypes.func
}

export default ChangelogModal
