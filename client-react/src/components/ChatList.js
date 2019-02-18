import React, { Component } from 'react'

export class ChatList extends Component {
  render() {
    const { messages } = this.props

    return (
      <ul>
        {messages.map(m => (
          <li key={m.id}>{m.content}</li>
        ))}
      </ul>
    )
  }
}
