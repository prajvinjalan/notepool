import React, { Component } from 'react'
import axios from 'axios'

import Note from '../presentation/Note'

class NoteDetails extends Component {
  constructor(){
    super()

    this.state = {
      item: {
        title: "Note Uno",
        body: "this is the first one",
        author: "Prajvin"
      },
      updatedNote: {
        title: "",
        body: "",
        author: ""
      }
    }
  }

  componentDidMount(){
    this.getNote();
  }

  getNote(){
    let noteId = this.props.match.params.id;
    axios.get(`/api/notes/${noteId}`)
      .then(response => {
        console.log(response.data.result);
        this.setState({
          item: response.data.result
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateNote(event){
    let updatedNote = Object.assign({}, this.state.updatedNote)
    updatedNote[event.target.id] = event.target.value
    this.setState({
      updatedNote: updatedNote
    })
  }

  submitInfo(){
    let updatedInfo = Object.assign({}, this.state.updatedNote)
    this.setState({
      item: updatedInfo
    })
  }

  render(){
    return(
      <div>
        <Note currentNote={this.state.item}></Note>
        <input id="title" onChange={this.updateNote.bind(this)} className="form-control" type="text" placeholder="Title"></input><br />
        <input id="body" onChange={this.updateNote.bind(this)} className="form-control" type="text" placeholder="Body"></input><br />
        <input id="author" onChange={this.updateNote.bind(this)} className="form-control" type="text" placeholder="Author"></input><br />
        <button onClick={this.submitInfo.bind(this)} className="btn btn-info" style={{marginRight: '10px'}}>Update Information</button>
      </div>
    )
  }
}

export default NoteDetails
