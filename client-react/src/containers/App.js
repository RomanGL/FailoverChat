import React, { Component } from 'react'
import Chat from './Chat'
import NavBar from '../components/NavBar'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Chat />
      </div>
    )
  }
}

export default App
