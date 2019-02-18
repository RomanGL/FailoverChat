import React, { Component } from 'react'

export class ChatForm extends Component {
  state = {
    value: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    alert(this.state.value)
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
