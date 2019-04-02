import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { Typography, ListItemAvatar } from '@material-ui/core'

const styles = theme => ({
  chatList: {
    overflow: 'auto',
    position: 'fixed',
    top: '64px',
    left: '0px',
    right: '0px',
    bottom: '90px',
    maxWidth: '420px',
    margin: '0 auto',
  },
  centeredItem: {
    justifyContent: 'center',
  },
})

class ChatList extends Component {
  renderTemplate = m => {
    const { classes } = this.props

    switch (m.action) {
      case 0:
        return (
          <ListItem className={classes.centeredItem}>
            <Typography variant='body2'>
              <b>{m.user.name}</b> joined to the conversation
            </Typography>
          </ListItem>
        )

      case 1:
        return (
          <ListItem className={classes.centeredItem}>
            <Typography variant='body2'>
              <b>{m.user.name}</b> left the conversation
            </Typography>
          </ListItem>
        )

      case 2:
        return (
          <ListItem className={classes.centeredItem}>
            <Typography variant='body2'>
              <b>{m.content}</b> is now <b>{m.user.name}</b>
            </Typography>
          </ListItem>
        )

      default:
        return (
          <ListItem className={classes.centeredItem}>
            <ListItemAvatar>
              <Avatar>{m.user.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={m.user.name} secondary={m.content} />
          </ListItem>
        )
    }
  }

  render() {
    const { messages, classes } = this.props

    return (
      <List className={classes.chatList} id='scroll'>
        {messages.map(m => this.renderTemplate(m))}
      </List>
    )
  }
}

ChatList.propTypes = {
  classes: PropTypes.object.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      content: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
}

export default withStyles(styles)(ChatList)
