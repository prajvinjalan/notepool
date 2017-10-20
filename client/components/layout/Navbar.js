import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render(){
    return(
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/notes">Notes</Link></li>
          <li><Link to="/profile/signup">Signup</Link></li>
          <li><Link to="/profile/login">Login</Link></li>
        </ul>
      </div>
    )
  }
}

export default Navbar
