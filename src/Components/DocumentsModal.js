import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  List
} from 'semantic-ui-react'
import getIconName from '../Utils/ExtensionToIcon'
import moment from 'moment'

class DocumentsModal extends React.Component {
  render () {
    return (
      <Modal
        trigger={this.props.trigger}
        open={this.props.isOpen}
        size='small'
        onClose={this.props.onClose}
      >
        <Modal.Header>Documents</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <List>
              {this.props.documents.map(doc => {
                return (
                  <List.Item key={'doc-' + doc.id}>
                    <List.Icon name='circle' />
                    <List.Content>
                      <List.Header>{doc.name}</List.Header>
                      <List.Description>
                        <p>{doc.description}</p>
                      </List.Description>
                      <List.List>
                        {doc.revisions.map(rev => {
                          return (
                            <List.Item key={'doc-rev-' + rev.id}>
                              <List.Icon name={getIconName(rev.extension)} />
                              <List.Content>
                                <List.Header>
                                  <a href={rev.file} target='_blank'>
                                    {rev.filename} (rev. {rev.revision})
                                  </a>
                                </List.Header>
                                <List.Description>
                                  <i
                                    style={{ fontSize: '.9em', color: '#666' }}
                                  >
                                    updated {moment(rev.lastEditDate).fromNow()}
                                  </i>
                                </List.Description>
                              </List.Content>
                            </List.Item>
                          )
                        })}
                      </List.List>
                    </List.Content>
                  </List.Item>
                )
              })}
            </List>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

DocumentsModal.propTypes = {
  trigger: PropTypes.object,
  isOpen: PropTypes.bool,
  documents: PropTypes.array,
  onClose: PropTypes.func
}

export default DocumentsModal
