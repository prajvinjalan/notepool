import React, { Component } from 'react'
import axios from 'axios'

import { APIManager } from '../../utils'
import { NoteForm } from '../presentation'

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
      <NoteForm header="Edit this note" item={this.state.item} handleInputChange={this.handleInputChange.bind(this)} buttonClick={this.editNote.bind(this)} buttonText="Update Note"/>
    )
  }
}

export default NoteDetails
