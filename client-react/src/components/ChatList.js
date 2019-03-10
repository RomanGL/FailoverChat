import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import WorkIcon from '@material-ui/icons/Work'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})

class ChatList extends Component {
  render() {
    const { messages, classes } = this.props

    return (
      <List className={classes.root}>
        {messages.map(m => (
          <React.Fragment>
            <ListItem>
              <Avatar>{m.user.name[0]}</Avatar>
              <ListItemText primary={m.content} secondary={m.user.name} />
            </ListItem>
          </React.Fragment>
        ))}
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
