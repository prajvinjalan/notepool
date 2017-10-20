import React, { Component } from 'react'
import axios from 'axios'

import { APIManager } from '../../utils'

class NoteDetails extends Component {
  constructor(){
    super();

    this.state = {
      item: {
        id: "",
        title: "",
        body: ""
      }
    }
  }

  componentDidMount(){
    this.getNote();
  }

  getNote(){
    let noteId = this.props.match.params.id;
    APIManager.get(`/api/notes/${noteId}`, null, (error, response) => {
      if(error){
        console.log(error.message);
        return;
      }
      let originalItem = {
        id: response.result._id,
        title: response.result.title,
        body: response.result.body
      }
      this.setState({
        item: originalItem
      });
    });
  }

  handleInputChange(event){
    let editedNote = Object.assign({}, this.state.item);
    editedNote[event.target.id] = event.target.value;
    this.setState({
      item: editedNote
    });
  }

  editNote(){
    APIManager.put(`/api/notes/${this.state.item.id}`, {data: this.state.item}, (error, response) => {
      if(error){
        console.log(error.message);
        return;
      }
      this.props.history.push('/notes');
    });
  }

  render(){
    return(
      <div className="container">
        <label htmlFor="title">Title</label>
        <input id="title" onChange={this.handleInputChange.bind(this)} className="form-control" type="text" ref="title" value={this.state.item.title}></input><br />
        <label htmlFor="body">Body</label>
        <input id="body" onChange={this.handleInputChange.bind(this)} className="form-control" type="text" ref="body" value={this.state.item.body}></input><br />
        <button onClick={this.editNote.bind(this)} className="btn btn-info" style={{marginRight: '10px'}}>Update Note</button>
      </div>
    )
  }
}

export default NoteDetails
