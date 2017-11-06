import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import { getNoteById } from '../../redux/reducers'

import { APIManager } from '../../utils'
import { NoteForm } from '../presentation'

class NoteDetails extends Component {
  constructor(props){
    super(props);

    this.state = {
      item: {
        title: '',
        body: ''
      }
    }
  }

  componentDidMount(){
    // let noteId = this.props.match.params.id;
    // this.props.fetchNote(noteId);
  }

  editNote(updatedNote){
    let noteId = this.props.match.params.id;
    APIManager.put(`/api/notes/${noteId}`, {data: updatedNote})
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
      <NoteForm header="Edit this note" item={this.props.notes} buttonClick={this.editNote.bind(this)} buttonText="Update Note"/>
    )
  }
}

const stateToProps = (state, ownProps) => ({
  notes: getNoteById(state.note, ownProps.match.params.id)
});

const dispatchToProps = (dispatch) => ({
  updateNote: (params) => dispatch(actions.updateNote(params))
});

export default connect(stateToProps, dispatchToProps)(NoteDetails)
