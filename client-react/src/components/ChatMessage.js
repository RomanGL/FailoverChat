import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ChatMessage extends Component {
  render() {
    const { message } = this.props
    return (
      <div className='container'>
        <p className='text-primary'>{message.user.name}</p>
        <p className='mt-0'>{message.content}</p>
      </div>
    )
  }
}

ChatMessage.propTypes = {
  message: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    content: PropTypes.string.isRequired,
  }),
}
