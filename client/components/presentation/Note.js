import React, { Component } from 'react'

import styles from '../../styles.js'

class Note extends Component {
  render(){
    const noteStyle = styles.note

    return(
      <div style={noteStyle.container}>
        <h2 style={noteStyle.header}>
          <a style={noteStyle.title} href="#">{this.props.currentNote.title}</a>
        </h2>
        <span>{this.props.currentNote.body}</span><br />
        <span>{this.props.currentNote.author}</span>
      </div>
    )
  }
}

export default Note
