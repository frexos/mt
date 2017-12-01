import React, { PureComponent } from 'react'
import logo from '../images/logo.svg'

export default class Header extends PureComponent {

  render() {

    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">React Vessel Tracking App</h1>
      </header>
    )
  }
}
