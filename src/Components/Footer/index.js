import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Image } from 'semantic-ui-react'
import Clock from 'react-live-clock'
import LogoOtto from '../../Static/Images/logo-otto.jpg'
import './styles.css'

const electron = window.require('electron')

const Footer = props => {
  return (
    <footer className='app-footer'>
      <div>
        <Icon name='clock' />
        <Clock format={'HH:mm'} ticking interval={1000 * 60} />
      </div>
      <div>
        <a onClick={() => { electron.shell.openExternal('https://www.otto.to.it') }}>
          <Image src={LogoOtto} alt='otto' />
        </a>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  onRunTour: PropTypes.func
}

export default Footer

// <div>
//   <Icon
//     name='help circle'
//     className='tour-icon'
//     size='large'
//     style={{ cursor: 'pointer' }}
//     onClick={props.onRunTour}
//   />
// </div>
