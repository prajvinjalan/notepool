import React, { Component } from 'react'

import styles from '../../styles.js'

class Footer extends Component {
  render(){
    return(
      <footer style={styles.universal.footer}>
        <div style={{...styles.universal.container, ...{height: '52px'}}}>
          Copyright &copy; 2017 Notepool
        </div>
      </footer>
    )
  }
}

export default Footer
