import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../redux/actions'
import { getNoteById } from '../../redux/reducers'

import { NoteForm } from '../presentation'

class NoteDetails extends Component {
  constructor(props){
    super(props);
  }

  editNote(updatedNote){
    updatedNote.id = this.props.match.params.id;
    this.props.updateNote(updatedNote);
    this.props.history.push('/notes');
  }

  render(){
    return(
      <NoteForm header="Edit this note" item={this.props.notes[0]} buttonClick={this.editNote.bind(this)} buttonText="Update Note"/>
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
