import React, { Component } from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import MySnackbarContent from '../components/MySnackbarContent'
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

  getMessageVariant = () => {
    const { socket } = this.props
    switch (socket.state) {
      case CONNECTION_STATE_CONNECTING:
        return 'warning'
      case CONNECTION_STATE_ALIVE:
        return 'success'
      default:
        return 'info'
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
        autoHideDuration={6000}
        onClose={this.handleClose}
        onExited={this.handleExited}>
        <MySnackbarContent
          onClose={this.handleClose}
          variant={this.getMessageVariant()}
          message={messageInfo.message}
        />
      </Snackbar>
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
