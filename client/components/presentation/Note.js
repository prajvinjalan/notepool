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

  updateColour(event){
    const updatedNote = {
      id: this.props.currentNote._id,
      title: this.props.currentNote.title,
      body: this.props.currentNote.body,
      colour: event.target.id
    }
    this.props.updateColour(updatedNote);
  }

  render(){
    return(
      <div style={Object.assign({}, styles.note.container, {background: this.props.currentNote.colour})}>
        <h2 style={styles.note.header}>
          <Link style={styles.note.title} to={`/notes/${this.props.currentNote._id}`}>{this.props.currentNote.title}</Link>
        </h2>
        <span style={styles.note.body}>{this.props.currentNote.body}</span><br />
        <div style={{paddingTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
          <div className="text-left">
            <button id="yellow" style={Object.assign({}, styles.note.colourButton, {background: 'yellow'})} onClick={this.updateColour.bind(this)} className="btn"></button>
            <button id="lightgreen" style={Object.assign({}, styles.note.colourButton, {background: 'lightgreen'})} onClick={this.updateColour.bind(this)} className="btn"></button>
            <button id="lightskyblue" style={Object.assign({}, styles.note.colourButton, {background: 'lightskyblue'})} onClick={this.updateColour.bind(this)} className="btn"></button>
          </div>
          <div className="text-right">
            <button onClick={this.callDelete.bind(this)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Note
