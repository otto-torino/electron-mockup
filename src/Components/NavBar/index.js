import React from 'react'
import PropTypes from 'prop-types'
import md5 from 'js-md5'
import config from '../../Config'
import { Menu, Image, Dropdown, Icon, Label } from 'semantic-ui-react'
import Logo from '../../Static/Images/logo.png'
import { Link } from 'react-router-dom'
import moment from 'moment'
import history from '../../history'
import { flattenWithChildren } from '../../Utils/Array'
import './styles.css'

const NavBar = props => {
  // revision buttons
  let actions = []
  if (props.isSuperUser) {
    actions.push(
      <Icon
        className='menu-analytics'
        onClick={props.openAnalyticsModal}
        key='action-analytics'
        name='bar chart'
        size='large'
      />
    )
  }
  let re = new RegExp("/mockup/\\d*/revision/(\\d*)") // eslint-disable-line
  let matches = props.location.pathname.match(re)
  if (matches) {
    actions.push(
      <Icon
        className='menu-revisions-sidebar'
        onClick={props.toggleRevisionSidebar}
        key='action-toggle-sidebar'
        name='code'
        size='large'
      />
    )
    let revisionId = matches[1]
    let comments = props.comments && props.comments[revisionId]
      ? flattenWithChildren(props.comments[revisionId])
      : []
    let newComments = comments.reduce((acc, value, index) => {
      let cfr = props.commentsVisits[revisionId] || null
      if ((!cfr || moment(value.insertionDate).format('x') > cfr) && value.author.userId !== props.userId) {
        return acc + 1
      }
      return acc
    }, 0)
    actions.push(
      <div className='icon-comments-wrapper' key='action-toggle-comments-wrapper'>
        <Icon
          className='menu-comments-sidebar'
          onClick={props.toggleCommentsSidebar}
          key='action-toggle-comments'
          name='comments'
          size='large'
        />
        {newComments > 0 ? <Label color='red' floating circular size='mini'>{newComments}</Label> : null }
      </div>
    )
    if (props.mockup.changelog) {
      actions.push(
        <Icon
          className='menu-changelog-modal'
          onClick={props.openChangelogModal}
          key='action-changelog'
          name='ordered list'
          size='large'
        />
      )
    }
    if (props.mockup.documents.length) {
      actions.push(
        <Icon
          className='menu-documents-modal'
          name='file text outline'
          onClick={props.openDocumentsModal}
          key='action-documents'
          size='large'
        />
      )
    }
    if (props.mockup.rawFilePath) {
      actions.push(
        <Icon
          className='menu-raw-modal'
          name='mobile'
          onClick={props.openRawModal}
          key='action-raw'
          size='big'
        />
      )
    }
  }
  // user stuff
  let userArea = null
  if (props.userName) {
    userArea = (
      <Menu.Item key='action-user'>
        <Dropdown
          key={'action-user'}
          text={props.userName}
          icon={
            <Image
              circular
              className='navbar-gravatar'
              src={
                'https://www.gravatar.com/avatar/' +
                md5(props.userEmail) +
                '?d=' +
                config.defaultGravatar
              }
            />
          }
          floating
          labeled
          className='icon user-area'
          pointing='top right'
        >
          <Dropdown.Menu>
            <Dropdown.Header content='Actions' />
            <Dropdown.Divider />
            <Dropdown.Item
              icon='settings'
              text='Settings'
              onClick={() => history.push('/settings')}
            />
            <Dropdown.Item
              icon='log out'
              text='Logout'
              onClick={props.onSignOut}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    )
  }

  return (
    <Menu inverted stackable>
      <Menu.Item>
        <Link to={config.basePath}>
          <Image className='app-logo' src={Logo} />
        </Link>
      </Menu.Item>
      <Menu.Menu position='right'>
        {actions.length ? <Menu.Item className='actions-menu'>{actions}</Menu.Item> : null }
        {userArea}
      </Menu.Menu>
    </Menu>
  )
}

NavBar.propTypes = {
  isSuperUser: PropTypes.bool,
  userId: PropTypes.number,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  onSignOut: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  toggleRevisionSidebar: PropTypes.func,
  toggleCommentsSidebar: PropTypes.func,
  openChangelogModal: PropTypes.func,
  openDocumentsModal: PropTypes.func,
  openRawModal: PropTypes.func,
  openAnalyticsModal: PropTypes.func,
  mockup: PropTypes.object,
  comments: PropTypes.object,
  commentsVisits: PropTypes.object
}

export default NavBar
