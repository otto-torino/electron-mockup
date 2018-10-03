import React from 'react'
import PropTypes from 'prop-types'
import { Form, Dropdown, TextArea, Button } from 'semantic-ui-react'

class EmailComposer extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedUsers: [],
      subject: '',
      message: ''
    }

    this.addUser = this.addUser.bind(this)
    this.toggleAllUsers = this.toggleAllUsers.bind(this)
    this.send = this.send.bind(this)
  }

  toOptions () {
    return this.props.users.filter(user => user.eMail).map(user => ({
      key: user.userId,
      text: user.userName + '<' + user.eMail + '>',
      value: user.userId
    }))
  }

  addUser (e, { value }) {
    this.setState({
      selectedUsers: value
    })
  }

  toggleAllUsers () {
    let values = this.state.selectedUsers.length
      ? []
      : this.props.users.map(user => user.userId)
    this.setState({
      selectedUsers: values
    })
  }

  send () {
    this.props.onSend({
      to: this.state.selectedUsers,
      subject: this.state.subject,
      message: this.state.message
    })
  }

  render () {
    return (
      <div>
        <Form>
          <div className='field' style={{ display: 'flex' }}>
            <Dropdown
              className='icon'
              icon='send'
              labeled
              button
              fluid
              multiple
              selection
              options={this.toOptions()}
              value={this.state.selectedUsers}
              onChange={this.addUser}
            />
            <Button
              basic
              onClick={this.toggleAllUsers}
              style={{ whiteSpace: 'nowrap' }}
            >
              Toggle All
            </Button>
          </div>
          <div className='field'>
            <Form.Input
              placeholder='Subject'
              type='text'
              onChange={(e, { value }) => this.setState({ subject: value })}
            />
          </div>
          <div className='field'>
            <TextArea
              autoHeight
              placeholder='Message'
              onChange={(e, { value }) => this.setState({ message: value })}
            />
          </div>
          <div className='field'>
            <Form.Field onClick={this.send} control={Button}>Send</Form.Field>
          </div>
        </Form>
      </div>
    )
  }
}

EmailComposer.propTypes = {
  users: PropTypes.array,
  onSend: PropTypes.func
}

export default EmailComposer
