import React, { Component } from 'react'

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
        <Note currentNote={this.state.item}></Note><br />
        <input id="title" onChange={this.updateNote.bind(this)} className="form-control" type="text" placeholder="Title"></input><br />
        <input id="body" onChange={this.updateNote.bind(this)} className="form-control" type="text" placeholder="Body"></input><br />
        <input id="author" onChange={this.updateNote.bind(this)} className="form-control" type="text" placeholder="Author"></input><br />
        <button onClick={this.submitInfo.bind(this)} className="btn btn-info" style={{marginRight: '10px'}}>Update Information</button>
      </div>
    )
  }
}

export default NoteDetails
