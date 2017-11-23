import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Grid, Modal } from 'semantic-ui-react'

import * as actions from '../../redux/actions'

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
    const note = {title: '', body: '', colour: 'white', collaborators: [this.props.user.email]};
    this.props.addNote(note)
    .then((response) => {
      this.show(response);
    });
  }

  show = (note) => {
    this.props.setCurrentNote(note);
    this.setState({
      open: true
    });
  }

  close = () => {
    this.setState({
      open: false
    });
  }



  render(){
    const noteButton = <Button circular icon='plus' size='big' color='teal' className='right-aligned-button' onClick={this.addNote}></Button>

    const listItems = this.props.notes.map((note, i) => {
      return(
        <Grid.Column key={note.id}>
          <Note show={this.show} currentNote={note} />
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
        <EditNote item={this.props.currentNote} open={this.state.open} close={this.close} />
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
  setCurrentNote: (params) => dispatch(actions.setCurrentNote(params))
})

export default connect(stateToProps, dispatchToProps)(Notes)
