import React, { Component } from 'react'
import axios from 'axios'

import { APIManager, Auth } from '../../utils'
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
    let id = Auth.getUserId();
    APIManager.get(`/api/users/${id}`, null)
    .then(response => {
      console.log(response);
      let params = { params: { collaborators: response.result.local.email }}
      APIManager.get('/api/notes', params)
      .then(response => {
        this.setState({
          list: response.result
        });
        return null;
      })
      .catch(error => {
        console.log(error.message);
      });
      return null;
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  addNote(newNote){
    let id = Auth.getUserId();
    APIManager.get(`/api/users/${id}`, null)
    .then(response => {
      newNote.collaborators.push(response.result.local.email);
      APIManager.post('/api/notes', newNote)
      .then(response => {
        this.getNotes();
        return null;
      })
      .catch(error => {
        console.log(error.message);
      });
      return null;
    })
    .catch(error => {
      console.log(error.message);
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

  updateNote(updatedNote){
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
    const noteForm = <NoteForm header="Add a note" item={{title: '', body: '', colour: '', collaborators: []}} buttonClick={this.addNote.bind(this)} buttonText="Add Note"/>

    return(
      <NoteList listItems={this.state.list} deleteNote={this.deleteNote.bind(this)} updateNote={this.updateNote.bind(this)} noteForm={noteForm}/>
    )
  }
}

export default Notes
