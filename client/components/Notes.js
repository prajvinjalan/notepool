import React, { Component } from 'react'

import Note from './Note'

class Notes extends Component {
  render(){
    return(
      <div>
        <ol>
          <li><Note /></li>
          <li><Note /></li>
          <li><Note /></li>
        </ol>
      </div>
    )
  }
}

export default Notes
