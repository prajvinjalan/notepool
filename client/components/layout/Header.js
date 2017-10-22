import React, { Component } from 'react'

import styles from '../../styles.js'

class Header extends Component {
  render(){
    return(
      <div style={styles.universal.container}>
        <h1 style={styles.universal.title}>Notepool</h1>
      </div>
    )
  }
}

export default Header
