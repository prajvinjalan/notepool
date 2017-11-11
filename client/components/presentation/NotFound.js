import React, { Component } from 'react'

import Navbar from '../containers/Navbar'

class NotFound extends Component {
  render(){
    return(
      <div>
        <Navbar />
        <div className="container">
          <h1>Erorr 404</h1>
          <p>We couldn't find the requested URL <span style={{fontWeight: 'bold'}}>{this.props.path}</span> on the server.</p>
        </div>
      </div>
    )
  }
}

export default NotFound
