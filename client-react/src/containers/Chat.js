import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChatList from '../components/ChatList'
import ChatForm from '../components/ChatForm'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import { sendMessage, getHistory } from '../actions/ChatActions'
import { setName } from '../actions/UserActions'

const styles = theme => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  formContainer: {
    bottom: '25px',
    left: '25px',
    right: '25px',
    position: 'fixed',
    maxWidth: '420px',
    margin: '0 auto',
  },
})

class Chat extends Component {
  render() {
    const { classes, user, chat, sendMessageAction } = this.props

    return (
      <React.Fragment>
        {chat.history.isFetching && (
          <Typography variant='h6'>Loading history...</Typography>
        )}
        {chat.history.error && (
          <Typography variant='h6'>
            An error occured: {chat.history.error}
          </Typography>
        )}

        {user.name && (
          <div className={classes.container}>
            <ChatList messages={chat.messages} />
            <div className={classes.formContainer}>
              <ChatForm sendMessage={sendMessageAction} />
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  sendMessageAction: PropTypes.func.isRequired,
  setNameAction: PropTypes.func.isRequired,
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
    getHistoryAction: () => dispatch(getHistory()),
    setNameAction: name => dispatch(setName(name)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chat))
