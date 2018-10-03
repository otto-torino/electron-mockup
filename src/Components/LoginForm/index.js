import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Form,
  Modal,
  Header,
  Icon
} from 'semantic-ui-react'
import Logo from '../../Static/Images/logo.png'

import './styles.css'

class Login extends React.Component {
  constructor () {
    super()
    this.submit = this.submit.bind(this)
    this.state = {
      loginErroModalOpen: false
    }
  }

  submit () {
    let userName = this.refs.userName.value
    let password = this.refs.password.value
    this.props.onSignIn(userName, password)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.loginError) {
      this.setState({ loginErroModalOpen: true })
    }
  }

  render () {
    return (
      <section className='login-form'>
        <img src={Logo} alt='logo' />
        <Form>
          <div className='field'>
            <div className='ui left icon input'>
              <input ref='userName' type='text' placeholder='Username' />
              <i className='user icon' />
            </div>
          </div>
          <div className='field'>
            <div className='ui left icon input'>
              <input ref='password' type='password' placeholder='***********' />
              <i className='lock icon' />
            </div>
          </div>
          <Form.Field control={Button} onClick={this.submit}>Sign In</Form.Field>
        </Form>
        <Modal open={this.state.loginErroModalOpen} basic size='small'>
          <Header icon='ban' content='Authentication Error' />
          <Modal.Content>
            <p>{this.props.loginError}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted onClick={() => this.setState({ loginErroModalOpen: false })}>
              <Icon name='checkmark' /> Retry
            </Button>
          </Modal.Actions>
        </Modal>
      </section>
    )
  }
}

Login.propTypes = {
  onSignIn: PropTypes.func,
  loginError: PropTypes.string
}

export default Login
