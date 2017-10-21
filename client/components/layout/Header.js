import React, { Component } from 'react'

import styles from '../../styles.js'

class Header extends Component {
  render(){
    return(
      <div style={styles.pageHeader.container}>
        <h1 style={styles.pageHeader.title}>Notepool</h1>
      </div>
    )
  }
}

export default Header
