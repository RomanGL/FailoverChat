import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  input: {
    margin: theme.spacing.unit,
    width: '100%',
  },
})

class ChatForm extends Component {
  state = {
    value: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.value) {
      this.props.sendMessage(this.state.value)
      this.setState({ value: '' })
    }
  }

  handleChangeValue = e => {
    this.setState({ value: e.target.value })
  }

  render() {
    const { classes } = this.props

    return (
      <form onSubmit={this.handleSubmit} className={classes.container}>
        <TextField
          label='Message'
          margin='dense'
          type='text'
          value={this.state.value}
          onChange={this.handleChangeValue}
          className={classes.input}
        />
      </form>
    )
  }
}

ChatForm.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ChatForm)
