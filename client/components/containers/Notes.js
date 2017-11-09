import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../redux/actions'

import { Note, NoteForm, NoteList } from '../presentation'

class Notes extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchNotes(this.props.user.id);
  }

  addNote(newNote){
    this.props.addNote({note: newNote, id: this.props.user.id});
  }

  updateNote(updatedNote){
    this.props.updateNote(updatedNote);
  }

  deleteNote(id){
    this.props.deleteNote(id);
  }

  addCollaborator(params){
    this.props.addCollaborator(params);
  }

  removeCollaborator(params){
    this.props.removeCollaborator(params);
  }

  render(){
    const noteForm = <NoteForm header="Add a note" item={{title: '', body: '', colour: '', collaborators: []}} buttonClick={this.addNote.bind(this)} buttonText="Add Note"/>

    return(
      <NoteList listItems={this.props.notes} deleteNote={this.deleteNote.bind(this)} updateNote={this.updateNote.bind(this)} addCollaborator={this.addCollaborator.bind(this)} removeCollaborator={this.removeCollaborator.bind(this)} noteForm={noteForm}/>
    )
  }
}

const stateToProps = (state) => ({
  notes: state.note.notes,
  user: state.user
})

const dispatchToProps = (dispatch) => ({
  fetchNotes: (params) => dispatch(actions.fetchNotes(params)),
  addNote: (params) => dispatch(actions.addNote(params)),
  updateNote: (params) => dispatch(actions.updateNote(params)),
  deleteNote: (params) => dispatch(actions.deleteNote(params)),
  addCollaborator: (params) => dispatch(actions.addCollaborator(params)),
  removeCollaborator: (params) => dispatch(actions.removeCollaborator(params))
})

export default connect(stateToProps, dispatchToProps)(Notes)
