import React, { Component } from 'react'

import Header from '../layout/Header'

class NotFound extends Component {
  render(){
    return(
      <div>
        <Header />
        <div className="container">
          <h1>Erorr 404</h1>
          <p>That means this page doesn't exist. We couldn't find the requested URL <span style={{fontWeight: 'bold'}}>{this.props.path}</span> on the server.</p>
        </div>
      </div>
    )
  }
}

export default NotFound
