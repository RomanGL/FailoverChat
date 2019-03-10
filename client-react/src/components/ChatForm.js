import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class ChatForm extends Component {
  state = {
    value: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.value) {
      this.props.sendMessage(this.state.value)
      this.setState({ value: '' })
    }
  }

  handleChangeValue = e => {
    this.setState({ value: e.target.value })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Text:
          <input
            type='text'
            value={this.state.value}
            onChange={this.handleChangeValue}
          />
        </label>
        <input type='Submit' value='Send' readOnly={true} />
      </form>
    )
  }
}

ChatForm.propTypes = {
  sendMessage: PropTypes.func.isRequired,
}
