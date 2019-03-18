import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChatList from '../components/ChatList'
import ChatForm from '../components/ChatForm'
import Connection from './Connection'
import Typography from '@material-ui/core/Typography'

import { sendMessage } from '../actions/ChatActions'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  container: {
    display: 'flex',
    height: '100%',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  formContainer: {
    width: '100%',
  },
})

class Chat extends Component {
  onButtonClick = e => {
    this.props.socketConnectAction()
  }

  render() {
    const { classes, user, chat, sendMessageAction } = this.props

    return (
      <React.Fragment>
        <Connection />
        <div className={classes.container}>
          <Typography variant='h6'>Your name is {user.name}</Typography>
          <ChatList messages={chat.messages} />
          <div className={classes.formContainer}>
            <ChatForm sendMessage={sendMessageAction} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
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
)(withStyles(styles)(Chat))
