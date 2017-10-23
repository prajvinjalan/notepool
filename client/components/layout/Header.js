import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from '../../styles.js'

class Header extends Component {
  render(){
    return(
      <div style={styles.universal.container}>
        <Link to="/" style={styles.universal.title}>Notepool</Link>
      </div>
    )
  }
}

export default Header
