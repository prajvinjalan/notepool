import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from '../../styles.js'

class Navbar extends Component {
  render(){
    return(
      <div className="container navbar" style={styles.navbar}>
        <ul className="nav navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/notes">Notes</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right" style={{marginRight: '0'}}>
          <li><Link to="/profile/register">Register</Link></li>
          <li><Link to="/profile/login">Login</Link></li>
        </ul>
      </div>
    )
  }
}

export default Navbar
