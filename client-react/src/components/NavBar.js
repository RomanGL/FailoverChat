import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Person from '@material-ui/icons/Person'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  personButton: {
    position: 'absolute',
    right: '2%',
    top: '35px',
    zIndex: 1,
  },
})

class NavBar extends Component {
  handleButtonClick = e => {
    e.preventDefault()
    this.props.renameUser()
  }

  render() {
    return (
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
            Failover chat
          </Typography>
          <Fab
            color='accent'
            className={this.props.classes.personButton}
            onClick={this.handleButtonClick}>
            <Person />
          </Fab>
        </Toolbar>
      </AppBar>
    )
  }
}

NavBar.propTypes = {
  renameUser: PropTypes.func.isRequired,
}

export default withStyles(styles)(NavBar)
