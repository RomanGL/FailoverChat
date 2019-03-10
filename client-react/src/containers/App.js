import React, { Component } from 'react'
import Chat from './Chat'
import NavBar from '../components/NavBar'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Chat />
      </React.Fragment>
    )
  }
}

export default App
