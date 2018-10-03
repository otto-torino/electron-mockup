import React from 'react'
import PropTypes from 'prop-types'
import { Header, Sidebar, Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { revisionRoute } from '../../Utils/Routes'

const RevisionSidebar = props => {
  return (
    <Sidebar
      as={Menu}
      animation='scale down'
      width='thin'
      visible={props.isOpen}
      icon='labeled'
      vertical
      className='sidebar-revision'
    >
      <Header as='h5' icon textAlign='center' style={{ paddingTop: '16px' }}>
        <Icon name='code' circular />
        <Header.Content>
          Revisions
        </Header.Content>
      </Header>
      {props.mockup.revisions.map(revision => {
        return (
          <Menu.Item
            name={revision.revision}
            active={revision.id === props.revision.id}
            key={'menu-revision-' + revision.id}
          >
            {revision.download ? (
              <p><a href={revision.downloadUrl}><Icon name='download' /></a></p>
            ) : null}
            <Link to={revisionRoute(props.mockup.id, revision.id)}>
              {revision.revision}
            </Link>
          </Menu.Item>
        )
      })}
    </Sidebar>
  )
}

RevisionSidebar.propTypes = {
  isOpen: PropTypes.bool,
  mockup: PropTypes.object,
  revision: PropTypes.object,
  toggleRevisionSidebar: PropTypes.func
}

export default RevisionSidebar
