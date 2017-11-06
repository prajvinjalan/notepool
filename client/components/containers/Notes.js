import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

import { Note, NoteForm, NoteList } from '../presentation'

class Notes extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchNotes();
  }

  addNote(newNote){
    this.props.addNote(newNote);
  }

  updateNote(updatedNote){
    this.props.updateNote(updatedNote);
  }

  deleteNote(id){
    this.props.deleteNote(id);
  }

  addCollaborator(){

  }

  render(){
    const noteForm = <NoteForm header="Add a note" item={{title: '', body: '', colour: '', collaborators: []}} buttonClick={this.addNote.bind(this)} buttonText="Add Note"/>

    return(
      <NoteList listItems={this.props.notes} deleteNote={this.deleteNote.bind(this)} updateNote={this.updateNote.bind(this)} addCollaborator={this.addCollaborator.bind(this)} noteForm={noteForm}/>
    )
  }
}

const stateToProps = (state) => ({
  notes: state.note
})

const dispatchToProps = (dispatch) => ({
  fetchNotes: (params) => dispatch(actions.fetchNotes(params)),
  addNote: (params) => dispatch(actions.addNote(params)),
  updateNote: (params) => dispatch(actions.updateNote(params)),
  deleteNote: (params) => dispatch(actions.deleteNote(params))
})

export default connect(stateToProps, dispatchToProps)(Notes)
