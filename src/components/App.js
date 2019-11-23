import React, { Component } from "react"
import "./App.css"
import CriOS from './CriOS'
import DesktopAndroid from './DesktopAndroid'

class App extends Component {
  render() {
    const userAgent = window.navigator.userAgent;
    console.log("userAgent", userAgent)
    const isChrome_iOS = userAgent.indexOf('CriOS');
    console.log("isChrome_iOS", isChrome_iOS)

    return (
      <div>
        {
          isChrome_iOS === -1
          ?
          <DesktopAndroid/>
          :
          <CriOS/>
        }
      </div>
    )
  }
}

export default App
