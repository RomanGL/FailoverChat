import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { socketConnect } from '../actions/SocketActions'

import {
  CONNECTION_STATE_CLOSED,
  CONNECTION_STATE_CONNECTING,
  CONNECTION_STATE_ERROR,
  CONNECTION_STATE_ALIVE,
} from '../reducers/socket'

class Connection extends Component {
  queue = []
  state = {
    isOpen: false,
    messageInfo: {},
  }

  componentDidMount() {
    const { socket } = this.props
    if (socket.state === CONNECTION_STATE_CLOSED) {
      this.props.socketConnectAction()
    }
  }

  componentDidUpdate(prevProps) {
    const { socket } = this.props
    if (socket.state === CONNECTION_STATE_ERROR) {
      this.props.socketConnectAction()
    } else if (prevProps.socket.state !== socket.state) {
      this.queueMessage(this.getMessage())
    }
  }

  queueMessage = message => {
    this.queue.push({
      message,
      key: new Date().getTime(),
    })

    if (this.state.isOpen) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ isOpen: false })
    } else {
      this.processQueue()
    }
  }

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        isOpen: true,
      })
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ isOpen: false })
  }

  handleExited = () => {
    this.processQueue()
  }

  getMessage = () => {
    const { socket } = this.props
    switch (socket.state) {
      case CONNECTION_STATE_CONNECTING:
        return `Connecting to ${socket.connection.server.url}`
      case CONNECTION_STATE_ALIVE:
        return `Connected to ${socket.connection.server.url}`
      default:
        return 'Unknown connection state'
    }
  }

  render() {
    const { messageInfo } = this.state

    return (
      <Snackbar
        key={messageInfo.key}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.isOpen}
        autoHideDuration={5000}
        onClose={this.handleClose}
        onExited={this.handleExited}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id='message-id'>{messageInfo.message}</span>}
        action={[]}
      />
    )
  }
}

const mapStateToProps = store => {
  return {
    socket: store.socket,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    socketConnectAction: () => dispatch(socketConnect()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Connection)
