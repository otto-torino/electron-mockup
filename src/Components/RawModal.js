import React from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'
import config from '../Config'
import {
  Modal
} from 'semantic-ui-react'

class RawModal extends React.Component {
  render () {
    let rawUrl = config.baseAbsPath + 'mockup/raw/' + this.props.mockup.id + '/revision/' + this.props.revision.id
    return (
      <Modal
        trigger={this.props.trigger}
        open={this.props.isOpen}
        size='small'
        onClose={this.props.onClose}
      >
        <Modal.Header>View Raw Mockup</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <QRCode value={rawUrl} />
              <p style={{ marginTop: '20px' }}>
                <a href={rawUrl} target='_blank'>
                  {rawUrl}
                </a>
              </p>
            </div>

          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

RawModal.propTypes = {
  trigger: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  mockup: PropTypes.object,
  revision: PropTypes.object
}

export default RawModal
