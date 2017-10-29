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

  render(){
    const listItems = this.props.listItems.map((note, i) => {
      return(
        <li key={note._id}><Note currentNote={note} deleteNote={this.deleteNote.bind(this)} updateNote={this.updateNote.bind(this)}></Note></li>
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
