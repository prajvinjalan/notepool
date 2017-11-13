import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Container, Grid, Modal } from 'semantic-ui-react'

import * as actions from '../../redux/actions'
import { getNoteById } from '../../redux/reducers'

import { Loading, Note, NoteForm, NoteList } from '../presentation'
import EditNote from './EditNote'
import styles from '../../styles'

class Notes extends Component {
  constructor(props){
    super(props);

    this.state = {
      open: false
    }
  }

  componentDidMount(){
    this.props.fetchNotes(this.props.user.id);
  }

  addNote(note){
    this.props.addNote({note: note, id: this.props.user.id});
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

  show = (id) => {
    this.props.setCurrentNote(id);
    this.setState({ open: true });
  }

  close = (note) => {
    this.setState({ open: false });
    if (note) {
      this.props.updateNote(note);
    }
  }

  render(){
    const noteForm = <NoteForm header="Add a note" item={{title: '', body: '', colour: '', collaborators: []}} buttonClick={this.addNote.bind(this)} buttonText="Add Note"/>

    const listItems = this.props.notes.map((note, i) => {
      return(
        <Grid.Column key={note.id}>
          <Note show={this.show.bind(this)} currentNote={note} deleteNote={this.deleteNote.bind(this)} updateNote={this.updateNote.bind(this)} addCollaborator={this.addCollaborator.bind(this)} removeCollaborator={this.removeCollaborator.bind(this)} />
        </Grid.Column>
      )
    })

    return(
      <div>
        {this.props.loading ?
          <Loading />
          :
          // <NoteList listItems={this.props.notes} deleteNote={this.deleteNote.bind(this)} updateNote={this.updateNote.bind(this)} addCollaborator={this.addCollaborator.bind(this)} removeCollaborator={this.removeCollaborator.bind(this)} noteForm={noteForm}/>
          <Container style={{marginTop: '50px'}}>
            <Grid columns={3} stackable>
              <Grid.Row>
                {listItems}
              </Grid.Row>
              <Grid.Row>
                {noteForm}
              </Grid.Row>
            </Grid>
          </Container>
        }
        <EditNote item={this.props.currentNote} open={this.state.open} close={this.close.bind(this)} deleteNote={this.deleteNote.bind(this)} />
      </div>
    )
  }
}

const stateToProps = (state) => ({
  notes: state.note.notes,
  currentNote: state.note.currentNote,
  user: state.user,
  loading: state.note.loading
})

const dispatchToProps = (dispatch) => ({
  fetchNotes: (params) => dispatch(actions.fetchNotes(params)),
  addNote: (params) => dispatch(actions.addNote(params)),
  updateNote: (params) => dispatch(actions.updateNote(params)),
  deleteNote: (params) => dispatch(actions.deleteNote(params)),
  addCollaborator: (params) => dispatch(actions.addCollaborator(params)),
  removeCollaborator: (params) => dispatch(actions.removeCollaborator(params)),
  setCurrentNote: (params) => dispatch(actions.setCurrentNote(params))
})

export default connect(stateToProps, dispatchToProps)(Notes)
