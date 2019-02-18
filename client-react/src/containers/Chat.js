import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ChatList } from '../components/ChatList'
import { ChatForm } from '../components/ChatForm'

class Chat extends Component {
  render() {
    const { user, chat } = this.props
    console.log(chat)

    return (
      <div>
        <p>Your name is {user.name}</p>
        <ChatList messages={chat.messages} />
        <ChatForm />
      </div>
    )
  }
}

const mapStateToProps = store => {
  console.log(store)

  return {
    user: store.user,
    chat: store.chat,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
