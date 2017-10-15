import React, { Component } from 'react'

import Note from '../presentation/Note'

class Notes extends Component {
  constructor(){
    super()

    this.state = {
      list: [],
      newNote: {
        title: "",
        body: "",
        author: ""
      }
    }
  }

  updateNote(event){
    let updatedNote = Object.assign({}, this.state.newNote)
    updatedNote[event.target.id] = event.target.value
    this.setState({
      newNote: updatedNote
    })
  }

  addNote(){
    let updatedList = Object.assign([], this.state.list)
    updatedList.push(this.state.newNote)
    this.setState({
      list: updatedList
    })
  }

  render(){

    const listItems = this.state.list.map((note, i) => {
      return(
        <li key={i}><Note currentNote={note}></Note></li>
      )
    })

    return(
      <div>
        <ol>
          {listItems}
        </ol>
        <input id="title" onChange={this.updateNote.bind(this)} className="form-control" type="text" placeholder="Title"></input><br />
        <input id="body" onChange={this.updateNote.bind(this)} className="form-control" type="text" placeholder="Body"></input><br />
        <input id="author" onChange={this.updateNote.bind(this)} className="form-control" type="text" placeholder="Author"></input><br />
        <button onClick={this.addNote.bind(this)} className="btn btn-danger">Add Note</button>
      </div>
    )
  }
}

export default Notes
