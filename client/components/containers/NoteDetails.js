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

  editNote(updatedNote){
    APIManager.put(`/api/notes/${this.state.item.id}`, {data: updatedNote}, (error, response) => {
      if(error){
        console.log(error.message);
        return;
      }
      this.props.history.push('/notes');
    });
  }

  render(){
    return(
      <NoteForm header="Edit this note" item={this.state.item} buttonClick={this.editNote.bind(this)} buttonText="Update Note"/>
    )
  }
}

export default NoteDetails
