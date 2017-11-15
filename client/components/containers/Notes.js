import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Grid, Modal } from 'semantic-ui-react'

import * as actions from '../../redux/actions'
import { getNoteById } from '../../redux/reducers'

import { Loading, Note } from '../presentation'
import EditNote from './EditNote'

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

  addNote = () => {
    const note = {title: '', body: '', colour: 'white', collaborators: []};
    this.show(note);
  }

  updateNote = (updatedNote) => {
    this.props.updateNote(updatedNote);
  }

  deleteNote = (id) => {
    this.props.deleteNote(id);
  }

  addCollaborator = (params) => {
    this.props.addCollaborator(params);
  }

  removeCollaborator = (params) => {
    this.props.removeCollaborator(params);
  }

  show = (note) => {
    this.props.setCurrentNote(note);
    this.setState({
      open: true
    });
  }

  close = (note) => {
    this.setState({
      open: false
    });
    if (note) { // undefined if closing on delete note button
      if (note.id) { // if this note already exists
        this.props.updateNote(note);
      } else { // if this is a new note it won't have an id
        this.props.addNote({note: note, id: this.props.user.id});
      }
    }
  }



  render(){
    const noteButton = <Button circular icon='plus' size='big' color='teal' className='right-aligned-button' onClick={this.addNote}></Button>

    const listItems = this.props.notes.map((note, i) => {
      return(
        <Grid.Column key={note.id}>
          <Note show={this.show} currentNote={note} deleteNote={this.deleteNote} updateNote={this.updateNote} addCollaborator={this.addCollaborator} removeCollaborator={this.removeCollaborator} />
        </Grid.Column>
      )
    })

    return(
      <div>
        {this.props.loading ?
          <Loading />
          :
          <Container style={{marginTop: '2rem'}}>
            <Grid columns={3} stackable>
              <Grid.Row>
                {listItems}
              </Grid.Row>
              <Grid.Row>
                {noteButton}
              </Grid.Row>
            </Grid>
          </Container>
        }
        <EditNote item={this.props.currentNote} open={this.state.open} close={this.close} deleteNote={this.deleteNote} />
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
