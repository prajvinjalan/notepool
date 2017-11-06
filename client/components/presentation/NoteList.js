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

  addCollaborator(){
    this.props.addCollaborator();
  }

  render(){
    const listItems = this.props.listItems.map((note, i) => {
      return(
        <li key={note.id}><Note currentNote={note} deleteNote={this.deleteNote.bind(this)} updateNote={this.updateNote.bind(this)} addCollaborator={this.addCollaborator.bind(this)} /></li>
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
