import React, { Component } from 'react'
import axios from 'axios'

import Note from '../presentation/Note'

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
    axios.get('/api/notes')
      .then(response => {
        this.setState({
          list: response.data.results
        });
      })
      .catch(error => {
        console.log(error);
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
    axios.request({
      method: 'post',
      url: '/api/notes',
      data: this.state.newNote
    })
    .then(response => {
      this.getNotes();
    })
    .catch(error => {
      console.log(error);
    });
  }

  deleteNote(id){
    axios.delete(`/api/notes/${id}`)
      .then(response => {
        this.getNotes();
      })
      .catch(error => {
        console.log(error);
      })
  }

  render(){
    const listItems = this.state.list.map((note, i) => {
      return(
        <li key={note._id}><Note currentNote={note} deleteNote={this.deleteNote.bind(this)}></Note></li>
      )
    })

    return(
      <div>
        <ol>
          {listItems}
        </ol>
        <input id="title" onChange={this.handleInputChange.bind(this)} className="form-control" type="text" placeholder="Title"></input><br />
        <input id="body" onChange={this.handleInputChange.bind(this)} className="form-control" type="text" placeholder="Body"></input><br />
        <button onClick={this.addNote.bind(this)} className="btn btn-info">Add Note</button>
      </div>
    )
  }
}

export default Notes
