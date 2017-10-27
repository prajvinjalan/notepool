import React, { Component } from 'react'
import axios from 'axios'

import { APIManager } from '../../utils'
import { NoteForm } from '../presentation'

class NoteDetails extends Component {
  constructor(props){
    super(props);

    this.state = {
      item: {
        id: '',
        title: '',
        body: ''
      }
    }
  }

  componentDidMount(){
    this.getNote();
  }

  getNote(){
    let noteId = this.props.match.params.id;
    APIManager.get(`/api/notes/${noteId}`)
    .then(response => {
      let originalItem = {
        id: response.result._id,
        title: response.result.title,
        body: response.result.body
      }
      this.setState({
        item: originalItem
      });
      return null;
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  editNote(updatedNote){
    APIManager.put(`/api/notes/${this.state.item.id}`, {data: updatedNote})
    .then(response => {
      this.props.history.push('/notes');
      return null;
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  render(){
    return(
      <NoteForm header="Edit this note" item={this.state.item} buttonClick={this.editNote.bind(this)} buttonText="Update Note"/>
    )
  }
}

export default NoteDetails
