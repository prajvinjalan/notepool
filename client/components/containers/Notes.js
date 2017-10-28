import React, { Component } from 'react'
import axios from 'axios'

import { APIManager } from '../../utils'
import { Note, NoteForm, NoteList } from '../presentation'

class Notes extends Component {
  constructor(props){
    super(props);

    this.state = {
      list: []
    }
  }

  componentDidMount(){
    this.getNotes();
  }

  getNotes(){
    APIManager.get('/api/notes', null)
    .then(response => {
      this.setState({
        list: response.result
      });
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  addNote(newNote){
    APIManager.post('/api/notes', newNote)
    .then(response => {
      this.getNotes();
      return null;
    })
    .catch(error => {
      console.log(error.message)
    });
  }

  deleteNote(id){
    APIManager.delete(`/api/notes/${id}`)
    .then(response => {
      this.getNotes();
      return null;
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  updateColour(updatedNote){
    APIManager.put(`/api/notes/${updatedNote.id}`, {data: updatedNote})
    .then(response => {
      this.getNotes();
      return null;
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  render(){
    const noteForm = <NoteForm header="Add a note" item={{title: '', body: '', colour: ''}} buttonClick={this.addNote.bind(this)} buttonText="Add Note"/>

    return(
      <NoteList listItems={this.state.list} deleteNote={this.deleteNote.bind(this)} updateColour={this.updateColour.bind(this)} noteForm={noteForm}/>
    )
  }
}

export default Notes
