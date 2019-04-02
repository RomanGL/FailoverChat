import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@material-ui/core'

class UserNameDialog extends Component {
  state = {
    userName: '',
  }

  handleRenameClick = e => {
    e.preventDefault()
    if (this.state.userName) {
      this.props.setName(this.state.userName)
    }
  }

  handleChangeUserName = e => {
    this.setState({ userName: e.target.value })
  }

  handleClose = () => {
    this.props.onCloseHandler()
  }

  render() {
    const { userName } = this.state

    return (
      <Dialog open={this.props.isOpen} onClose={this.handleClose}>
        <DialogTitle>Set your name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To use this chat, please enter your name here. You can change your
            name later at any time.
          </DialogContentText>
          <TextField
            autoFocus={true}
            margin='dense'
            id='name'
            label='Enter name'
            fullWidth={true}
            value={userName}
            onChange={this.handleChangeUserName}
          />
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={this.handleRenameClick}>
            Rename
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

UserNameDialog.propTypes = {
  currentName: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
}

export default UserNameDialog
