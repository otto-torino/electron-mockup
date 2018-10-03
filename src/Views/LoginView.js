import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from '../Components/LoginForm'
import AuthActions from '../Redux/Auth'
import {
  Container,
  Grid
} from 'semantic-ui-react'
import history from '../history'

class LoginView extends React.Component {
  componentWillMount () {
    if (this.props.isAuthenticated) {
      history.push('/')
    }
  }

  render () {
    return (
      <div className='page-login'>
        <Container>
          <Grid doubling centered>
            <Grid.Column textAlign='center' mobile={16} tablet={8} computer={6}>
              <LoginForm onSignIn={this.props.onSignIn} loginError={this.props.loginError} />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    )
  }
}

LoginView.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  loginError: PropTypes.string,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    loginError: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (userName, password) =>
      dispatch(AuthActions.loginRequest(userName, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
