import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setName } from '../actions/UserActions'
import Chat from './Chat'
import NavBar from '../components/NavBar'
import UserNameDialog from '../components/UserNameDialog'
import Connection from './Connection'

class App extends Component {
  state = {
    needRename: true,
  }

  renameUserButtonHandler = () => {
    this.setState({ needRename: true })
  }

  renameUser = message => {
    this.setState({ needRename: false })
    this.props.setNameAction(message)
  }

  onDialogCloseHandler = () => {
    //this.setState({ needRename: false })
  }

  render() {
    const { user } = this.props

    return (
      <div>
        <NavBar renameUser={this.renameUserButtonHandler} />
        <Chat />

        {(!user.name || this.state.needRename) && (
          <UserNameDialog
            setName={this.renameUser}
            currentName={user.name}
            isOpen={this.state.needRename}
            onCloseHandler={this.onDialogCloseHandler}
          />
        )}
        {user.name && <Connection />}
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNameAction: name => dispatch(setName(name)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
