import React, { Component } from 'react'
import Cryptolist from './components/Cryptolist'

class App extends Component {
  render() {
    return (
      <>
        <h1 className="center">Crypto-Currency!</h1>
        <Cryptolist />
      </>
    )
  }
}

export default App
