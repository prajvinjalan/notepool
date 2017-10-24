import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from '../../styles.js'

class Note extends Component {
  constructor(props){
    super(props);
  }

  callDelete(){
    this.props.deleteNote(this.props.currentNote._id);
  }

  render(){
    return(
      <div style={styles.note.container}>
        <h2 style={styles.note.header}>
          <Link style={styles.note.title} to={`/notes/${this.props.currentNote._id}`}>{this.props.currentNote.title}</Link>
        </h2>
        <span>{this.props.currentNote.body}</span><br />
        <div className="text-right">
          <button onClick={this.callDelete.bind(this)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    )
  }
}

export default Note
