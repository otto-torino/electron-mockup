import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import {
  Table,
  Modal,
  Icon,
  Popup,
  Pagination,
  Feed,
  Input,
  Loader,
  Image
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import EmailComposer from '../EmailComposer'
import DocumentsModal from '../DocumentsModal'
import ChangelogModal from '../ChangelogModal'
import NoImage from '../../Static/Images/no-image.jpg'
import RawModal from '../RawModal'
import { revisionRoute } from '../../Utils/Routes'

class MockupsIndexTable extends React.Component {
  constructor () {
    super()

    this.state = {
      page: 1,
      changelogModalOpen: null,
      documentsModalOpen: null,
      emailModalOpen: null,
      qrCodeModal: null,
      isLoading: false,
      searchFilter: '',
      thumbModalOpen: null,
      modalThumb: null
    }

    this.itemsForPage = 8

    this.handlePaginationChange = this.handlePaginationChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onSendMail = this.onSendMail.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.mockups &&
      this.props.mockups &&
      nextProps.mockups.length !== this.props.mockups.length
    ) {
      this.setState({ page: 1 })
    }
  }

  handlePaginationChange (e, { activePage }) {
    this.setState({ page: activePage })
  }

  onSearch (e, { value }) {
    this.setState({ searchFilter: value })
  }

  onSendMail (mockup) {
    return data => {
      this.props.sendMail(mockup.id, data)
      this.setState({ emailModalOpen: false })
    }
  }

  documentsModal (mockup) {
    let trigger = (
      <Popup
        trigger={
          <Icon
            name='file text outline'
            circular
            color={mockup.documents.length ? 'green' : 'grey'}
            onClick={() => {
              if (mockup.documents.length) {
                this.setState({ documentsModalOpen: mockup.id })
              }
            }}
            style={mockup.documents.length ? { cursor: 'pointer' } : {}}
          />
        }
        content={mockup.documents.length ? 'Documents' : 'No documents found'}
        position='top center'
      />
    )
    let isOpen = this.state.documentsModalOpen === mockup.id
    return (
      <DocumentsModal
        trigger={trigger}
        isOpen={isOpen}
        documents={mockup.documents}
        onClose={() => this.setState({ documentsModalOpen: null })}
      />
    )
  }

  changelogModal (mockup) {
    let trigger = (
      <Popup
        trigger={
          <Icon
            name='ordered list'
            circular
            color={mockup.changelog ? 'green' : 'grey'}
            onClick={() => {
              if (mockup.changelog) {
                this.setState({ changelogModalOpen: mockup.id })
              }
            }}
            style={mockup.changelog ? { cursor: 'pointer' } : {}}
          />
        }
        content={mockup.changelog ? 'CHANGELOG' : 'CHANGELOG not provided'}
        position='top center'
      />
    )
    let isOpen = this.state.changelogModalOpen === mockup.id
    return (
      <ChangelogModal
        trigger={trigger}
        isOpen={isOpen}
        changelog={mockup.changelog}
        size='small'
        onClose={() => this.setState({ changelogModalOpen: null })}
      />
    )
  }

  emailModal (mockup) {
    if (!this.props.isSuperUser) {
      return null
    }

    let trigger = (
      <Popup
        trigger={
          <Icon
            name='mail'
            circular
            color={mockup.users.length ? 'green' : 'grey'}
            onClick={() => {
              if (mockup.users.length) {
                this.setState({ emailModalOpen: mockup.id })
              }
            }}
            style={mockup.users.length ? { cursor: 'pointer' } : {}}
          />
        }
        content={mockup.users.length ? 'Send e-mail' : 'No associated users'}
        position='top center'
      />
    )
    let isOpen = this.state.emailModalOpen === mockup.id
    return (
      <Modal
        trigger={trigger}
        open={isOpen}
        size='small'
        onClose={() => this.setState({ emailModalOpen: null })}
      >
        <Modal.Header>Send E-Mail</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <EmailComposer
              users={mockup.users}
              onSend={this.onSendMail(mockup)}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }

  qrCodeModal (mockup, revision) {
    let trigger = (
      <Popup
        trigger={
          <Icon
            name='qrcode'
            circular
            color={mockup.rawFilePath ? 'green' : 'grey'}
            onClick={() => {
              if (mockup.rawFilePath) {
                this.setState({ qrCodeModalOpen: mockup.id })
              }
            }}
            style={mockup.rawFilePath ? { cursor: 'pointer' } : {}}
          />
        }
        content={mockup.rawFilePath ? 'View raw mockup' : 'No raw view'}
        position='top center'
      />
    )
    let isOpen = this.state.qrCodeModalOpen === mockup.id
    return (
      <RawModal
        trigger={trigger}
        isOpen={isOpen}
        mockup={mockup}
        revision={revision}
        onClose={() => this.setState({ qrCodeModalOpen: null })}
      />
    )
  }

  render () {
    if (this.props.isFetching && !this.props.mockups) {
      return (
        <div style={{ marginTop: '2rem', height: '160px' }}>
          <Loader active content='Loading' size='medium' />
        </div>
      )
    }

    if (!this.props.mockups || !this.props.mockups.length) {
      return null
    }

    // filter
    let filteredMockups = this.props.mockups.slice()
    if (this.state.searchFilter) {
      let re = new RegExp(this.state.searchFilter, 'i')
      filteredMockups = filteredMockups.filter(m => re.test(m.name))
    }

    // pagination
    let start = (this.state.page - 1) * this.itemsForPage
    let end = start + this.itemsForPage
    let mockups = filteredMockups.slice(start, end)

    return (
      <div style={{ marginTop: '2rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Input
            icon='search'
            placeholder='Search...'
            onChange={this.onSearch}
          />
          {this.props.switchButton}
        </div>
        <Table celled padded definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell singleLine>Mockup</Table.HeaderCell>
              <Table.HeaderCell>Last Revision Update</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {mockups.map((mockup, index) => {
              return (
                <Table.Row key={'table-row-' + mockup.id}>
                  <Table.Cell collapsing style={{ padding: 0 }}>
                    {mockup.thumb && (
                      <Image
                        size='tiny'
                        centered
                        src={mockup.thumb}
                        onClick={() =>
                          this.setState({ thumbModalOpen: mockup.thumb })
                        }
                        style={{ cursor: 'pointer' }}
                      />
                    )}
                    {mockup.thumb === null && (
                      <Image size='tiny' centered src={NoImage} />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <h4>
                      <Link
                        to={revisionRoute(mockup.id, mockup.lastRevision.id)}
                      >
                        {mockup.name}
                      </Link>
                    </h4>
                  </Table.Cell>
                  <Table.Cell>
                    <Feed>
                      <Feed.Event>
                        <Feed.Label>
                          <Icon name='mobile' />
                        </Feed.Label>
                        <Feed.Content>
                          <Feed.Date>
                            {moment(mockup.lastRevision.lastEditDate).fromNow()}
                          </Feed.Date>
                          <Feed.Summary>
                            <div>
                              <b>rev.</b>{' '}
                              <Link
                                to={revisionRoute(
                                  mockup.id,
                                  mockup.lastRevision.id
                                )}
                              >
                                {mockup.lastRevision.revision}
                              </Link>
                            </div>
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    </Feed>
                  </Table.Cell>
                  <Table.Cell
                    style={{ whiteSpace: 'nowrap' }}
                    className={index ? '' : 'first-row-actions'}
                  >
                    {this.changelogModal(mockup)}
                    {this.documentsModal(mockup)}
                    {this.qrCodeModal(mockup, mockup.lastRevision)}
                    {this.emailModal(mockup)}
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
        {this.state.thumbModalOpen && (
          <Modal
            open
            basic
            onClose={() => this.setState({ thumbModalOpen: null })}
          >
            <Modal.Content>
              <Image src={this.state.thumbModalOpen} />
            </Modal.Content>
          </Modal>
        )}
        <Pagination
          activePage={this.state.page}
          onPageChange={this.handlePaginationChange}
          totalPages={Math.ceil(filteredMockups.length / this.itemsForPage)}
        />
      </div>
    )
  }
}

MockupsIndexTable.propTypes = {
  mockups: PropTypes.array,
  isSuperUser: PropTypes.bool,
  isFetching: PropTypes.bool,
  sendMail: PropTypes.func,
  switchButton: PropTypes.object
}

export default MockupsIndexTable
