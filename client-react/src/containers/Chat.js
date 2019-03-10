import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChatList from '../components/ChatList'
import { ChatForm } from '../components/ChatForm'
import Connection from './Connection'

import { sendMessage } from '../actions/ChatActions'

class Chat extends Component {
  onButtonClick = e => {
    this.props.socketConnectAction()
  }

  render() {
    const { user, chat, sendMessageAction } = this.props

    return (
      <div className='container mt-4'>
        <Connection />
        <p>Your name is {user.name}</p>
        <ChatList messages={chat.messages} />
        <ChatForm sendMessage={sendMessageAction} />
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
    chat: store.chat,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendMessageAction: message => dispatch(sendMessage(message)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
