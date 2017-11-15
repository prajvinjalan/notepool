import React, { Component } from 'react'

import { Note } from '../presentation'

class NoteList extends Component {
  constructor(props){
    super(props);
  }

  deleteNote(id){
    this.props.deleteNote(id);
  }

  updateNote(updatedNote){
    this.props.updateNote(updatedNote);
  }

  addCollaborator(params){
    this.props.addCollaborator(params);
  }

  removeCollaborator(params){
    this.props.removeCollaborator(params);
  }

  render(){
    const listItems = this.props.listItems.map((note, i) => {
      return(
        <li key={note.id}><Note currentNote={note} deleteNote={this.deleteNote.bind(this)} updateNote={this.updateNote.bind(this)} addCollaborator={this.addCollaborator.bind(this)} removeCollaborator={this.removeCollaborator.bind(this)} /></li>
      )
    })

    return(
      <div>
        <ol className="container">
          {listItems}
        </ol>
        {this.props.noteForm}
      </div>
    )
  }
}

export default NoteList
