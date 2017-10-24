import React, { Component } from 'react'
import axios from 'axios'

import { APIManager } from '../../utils'
import { Note, NoteForm, NoteList } from '../presentation'

class Notes extends Component {
  constructor(){
    super();

    this.state = {
      list: [],
      newNote: {
        title: "",
        body: ""
      }
    }
  }

  componentDidMount(){
    this.getNotes();
  }

  getNotes(){
    APIManager.get('/api/notes', null, (error, response) => {
      if (error){
        console.log(error.message);
        return;
      }
      this.setState({
        list: response.results
      });
    });
  }

  handleInputChange(event){
    let updatedNote = Object.assign({}, this.state.newNote);
    updatedNote[event.target.id] = event.target.value;
    this.setState({
      newNote: updatedNote
    });
  }

  addNote(){
    APIManager.post('/api/notes', this.state.newNote, (error, response) => {
      if (error){
        console.log(error.message);
        return;
      }
      this.getNotes();
    });
  }

  deleteNote(id){
    APIManager.delete(`/api/notes/${id}`, (error, response) => {
      if (error){
        console.log(error.message);
        return;
      }
      this.getNotes();
    });
  }

  render(){
    const noteForm = <NoteForm header="Add a note" item={{title: "", body: ""}} handleInputChange={this.handleInputChange.bind(this)} buttonClick={this.addNote.bind(this)} buttonText="Add Note"/>

    return(
      <NoteList listItems={this.state.list} deleteNote={this.deleteNote.bind(this)} noteForm={noteForm}/>
    )
  }
}

export default Notes
