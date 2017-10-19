import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render(){
    return(
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/notes">Notes</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link onClick={this.props.history.goBack}></Link></li>
        </ul>
      </div>
    )
  }
}

export default Navbar
