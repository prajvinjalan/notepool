import React, { Component } from 'react'
import axios from 'axios'

import { APIManager } from '../../utils'
import { Note } from '../presentation'
import styles from '../../styles.js'

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
    const listItems = this.state.list.map((note, i) => {
      return(
        <li key={note._id}><Note currentNote={note} deleteNote={this.deleteNote.bind(this)}></Note></li>
      )
    })

    return(
      <div className="container" style={{padding: '15px'}}>
        <ol>
          {listItems}
        </ol>
        <h1>Add a new note</h1>
        <fieldset className="form-group" style={styles.universal.formGroup}>
          <label htmlFor="title" style={styles.universal.formLabel}>Title</label>
          <input id="title" onChange={this.handleInputChange.bind(this)} className="form-control"  style={styles.note.formInput} type="text" ref="title"></input>
        </fieldset>
        <fieldset className="form-group" style={styles.universal.formGroup}>
          <label htmlFor="body" style={styles.universal.formLabel}>Body</label>
          <input id="body" onChange={this.handleInputChange.bind(this)} className="form-control" style={styles.note.formInput} type="text" ref="body"></input>
        </fieldset>
        <button onClick={this.addNote.bind(this)} className="btn btn-info">Add Note</button>
      </div>
    )
  }
}

export default Notes
