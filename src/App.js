import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AppRouter from './Router'
import StartupActions from './Redux/Startup'
import AnalyitcsActions from './Redux/Analytics'
import config from './Config'
import Sockette from 'sockette'
import Dispatcher from './Utils/Dispatcher'
import Analytics from './Containers/AnalyticsContainer'
import { ToastContainer, toast } from 'react-toastify'
import './Static/Styles/App.css'

class App extends Component {
  constructor () {
    super()
    this.ws = null
    this.wsPositionInterval = null
  }
  componentWillMount () {
    // startup operation:
    // check for token
    this.props.startup()
  }

  componentDidMount () {
    this.setUpSockectStuff()
  }

  setUpSockectStuff () {
    this.justLoggedIn = false
    Dispatcher.register('loginSuccess', () => {
      this.justLoggedIn = true
    })
    Dispatcher.register('whoamiSuccess', () => this.startSocket())
    Dispatcher.register('logoutSuccess', () => {
      this.ws.json({
        type: 'LOGOUT'
      })
    })
  }

  startSocket () {
    let onSocketOpened = e => {
      console.info('Socket Connected!', e)
      if (this.justLoggedIn) {
        this.ws.json({ type: 'LOGIN' })
      }

      if (!this.props.auth.isSuperUser) {
        // send now your initial position
        this.ws.json({
          type: 'LOCATION',
          pathname: this.props.pathname
        })
        // update every 10 seconds (id admin logs in after you load an url and stay there forever)
        this.wsPositionInterval = setInterval(
          () =>
            this.ws.json({
              type: 'LOCATION',
              pathname: this.props.pathname
            }),
          10000
        )
        // dispatch on location change
        Dispatcher.register('locationChanged', (e, path) => {
          this.ws.json({
            type: 'LOCATION',
            pathname: path
          })
        })
      }
    }

    console.info('STARTING WEBSOCKET CONNECTION')
    this.ws = new Sockette(config.wsBasePath + '/analytics', {
      timeout: 5e3,
      maxAttempts: 5,
      onopen: onSocketOpened,
      onmessage: e => {
        console.log('Received:', e)
        if (!this.props.auth.isAuthenticated) {
          this.ws.close()
        } else {
          let data = JSON.parse(e.data)
          if (data.type === 'LOCATION') {
            this.props.updatePositions(data)
          } else if (data.type === 'DISCONNECT') {
            this.props.disconnectUser(data)
          } else if (data.type === 'LOGIN') {
            toast.info(`${data.user} has just logged in`)
          } else if (data.type === 'LOGOUT') {
            toast.info(`${data.user} has just logged out`)
          }
        }
      },
      onreconnect: e => console.log('Reconnecting...', e),
      onclose: e => console.log('Closed!', e),
      onerror: e => console.log('Error:', e)
    })
  }

  shouldComponentUpdate () {
    return true
  }

  componentWillUnmount () {
    clearInterval(this.wsPositionInterval)
    this.ws.close()
  }

  render () {
    // show nothing before startup actions:
    // avoid showing an empty home page (or others) and
    // then suddendly redirecting if no internet connection or
    // not logged in
    if (!this.props.startupComplete) {
      return null
    }

    return (
      <div>
        <AppRouter />
        <Analytics />
        <ToastContainer />
      </div>
    )
  }
}

App.propTypes = {
  startup: PropTypes.func,
  startupComplete: PropTypes.bool,
  auth: PropTypes.object,
  pathname: PropTypes.string,
  updatePositions: PropTypes.func,
  disconnectUser: PropTypes.func
}

const mapStateToProps = state => ({
  startupComplete: state.startup.complete,
  auth: state.auth,
  pathname: state.routing.location ? state.routing.location.pathname : ''
})

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
  updatePositions: (positionData) => dispatch(AnalyitcsActions.updatePositions(positionData)),
  disconnectUser: (username) => dispatch(AnalyitcsActions.disconnectUser(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
