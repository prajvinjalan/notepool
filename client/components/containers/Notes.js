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

  addNote(newNote){
    APIManager.post('/api/notes', newNote, (error, response) => {
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
    const noteForm = <NoteForm header="Add a note" item={{title: "", body: ""}} buttonClick={this.addNote.bind(this)} buttonText="Add Note"/>

    return(
      <NoteList listItems={this.state.list} deleteNote={this.deleteNote.bind(this)} noteForm={noteForm}/>
    )
  }
}

export default Notes
