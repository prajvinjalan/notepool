import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from '../../styles.js'
import { CollaboratorForm } from '../presentation'

class Note extends Component {
  constructor(props){
    super(props);

    this.state = {
      showCollabForm: false
    }
  }

  callDelete(){
    this.props.deleteNote(this.props.currentNote.id);
  }

  toggleCollaboratorForm(){
    this.setState({
      showCollabForm: !this.state.showCollabForm
    });
  }

  addCollaborator(email){
    this.toggleCollaboratorForm();
    const updatedCollaborators = {
      id: this.props.currentNote.id,
      email: email
    }
    this.props.addCollaborator(updatedCollaborators);
  }

  removeCollaborator(event){
    const updatedCollaborators = {
      id: this.props.currentNote.id,
      email: event.target.id
    }
    this.props.removeCollaborator(updatedCollaborators);
  }

  updateColour(event){
    if(this.props.currentNote.colour !== event.target.id){
      const updatedNote = {
        id: this.props.currentNote.id,
        colour: event.target.id
      }
      this.props.updateNote(updatedNote);
    }
  }

  render(){
    const collabList = this.props.currentNote.collaborators.map((text, i) => {
      return(
        <li key={i}>{text}<button id={text} onClick={this.removeCollaborator.bind(this)} style={{...styles.note.roundedButton, ...{marginLeft: '10px'}}} className="btn btn-danger"></button></li>
      )
    })

    return(
      <div style={{...styles.note.container, ...{background: this.props.currentNote.colour}}}>
        <div style={{gridColumn: 'column-start / column-2', gridRow: 'row-start / row-2'}}>
          <h2 style={styles.note.header}>
            <Link style={styles.note.title} to={`/notes/${this.props.currentNote.id}`}>{this.props.currentNote.title}</Link>
          </h2>
          <span style={styles.note.body}>{this.props.currentNote.body}</span>
        </div>
        <div style={{gridColumn: 'column-2 / column-end', gridRow: 'row-start / row-2', justifySelf: 'right'}}>
          <button id="yellow" style={Object.assign({}, styles.note.colourButton, {background: 'yellow'})} onClick={this.updateColour.bind(this)} className="btn"></button>
          <button id="lightgreen" style={Object.assign({}, styles.note.colourButton, {background: 'lightgreen'})} onClick={this.updateColour.bind(this)} className="btn"></button>
          <button id="lightskyblue" style={Object.assign({}, styles.note.colourButton, {background: 'lightskyblue'})} onClick={this.updateColour.bind(this)} className="btn"></button>
        </div>
        <div style={{gridColumn: 'column-start / column-2', gridRow: 'row-2 / row-end', placeSelf: 'end left', textAlign: 'center'}}>
          <div style={{float: 'left'}}>
            <span style={{fontWeight: '600'}}>Collaborators</span>
            <ul style={{listStyleType: 'none', padding: '10px 0 0 0'}}>
              {collabList}
            </ul>
          </div>
          <div style={{float: 'right', padding: '18px', height: '70px'}}>
            <button onClick={this.toggleCollaboratorForm.bind(this)} className="btn btn-primary">Add Collaborator</button>
            {this.state.showCollabForm ? <CollaboratorForm buttonClick={this.addCollaborator.bind(this)}/> : null}
          </div>
        </div>
        <div style={{gridColumn: 'column-2 / column-end', gridRow: 'row-2 / row-end', placeSelf: 'end'}}>
          <button onClick={this.callDelete.bind(this)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    )
  }
}

export default Note
