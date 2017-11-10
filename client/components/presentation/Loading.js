import React, { Component } from 'react'
import ReactLoading from 'react-loading'

import styles from '../../styles'

class Loading extends Component {
  render(){
    return(
      <div style={styles.universal.loading}>
        <ReactLoading type='spokes' delay={0} color='#888' height='48px' width='48px'/>
      </div>
    )
  }
}

export default Loading
