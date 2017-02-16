import React, { Component } from 'react'

import Header from '../components/header'
import Footer from '../components/footer'

export default class App extends Component {
  render() {
    const { children, routes, location } = this.props
    return (
      <div>
        <Header routes={routes} location={location} />
        <div id="container">{ children }</div>
        <Footer />
      </div>
    )
  }
}
