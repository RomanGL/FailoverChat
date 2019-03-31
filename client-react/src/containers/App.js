import React, { Component } from 'react'
import Chat from './Chat'
import NavBar from '../components/NavBar'
import Connection from './Connection'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Connection />
        <Chat />
      </div>
    )
  }
}

export default App
