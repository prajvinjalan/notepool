import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Dropdown, Grid, Icon, Input, Label, Modal } from 'semantic-ui-react'

import * as actions from '../../redux/actions'
import { getNotesByTerm } from '../../redux/reducers'

import { Loading, Note } from '../presentation'
import EditNote from './EditNote'

class Notes extends Component {
  constructor(props){
    super(props);

    this.state = {
      open: false
    }
  }

  // When the page loads ('/notes'), fetch all notes to display
  componentDidMount(){
    this.props.fetchNotes(this.props.user.email);
  }

  // Adds a new blank note with the user as a collaborator, then opens the modal to edit the note
  addNote = () => {
    const note = {
      type: 'text',
      title: '',
      body: '',
      listBody: [{text: '', checked: false}],
      colour: 'white',
      collaborators: [{
        email: this.props.user.email,
        type: 'Owner'
      }]
    };
    this.props.addNote(note)
    .then((response) => {
      this.show(response);
    });
  }

  // Opens the 'Edit Note' modal
  show = (note) => {
    this.props.setCurrentNote(note); // Sets the current note to show in the modal
    this.setState({
      open: true
    });
  }

  // Closes the 'Edit Note' modal
  close = () => {
    this.setState({
      open: false
    });
  }

  // Handles input changes to search box
  handleInputChange = (event) => {
    this.props.setSearchTerm(event.target.value.toLowerCase());
  }

  // Adds a filter option
  addSearchFilter = (event, { label, text }) => {
    if (label){
      this.props.addSearchFilter({name: text, item: label.className, type: 'colour'});
    } else {
      this.props.addSearchFilter({name: text, item: text, type: 'permission'});
    }
  }

  // Removes a filter option
  removeSearchFilter = (event) => {
    this.props.removeSearchFilter(event.target.id);
  }

  render(){
    // Creates a button to add notes
    const noteButton = <Button circular icon='plus' size='big' color='teal' className='right-aligned-button' onClick={this.addNote}></Button>

    // Creates a Grid Column item with each note
    const noteItems = this.props.searchedNotes.map((note, i) => {
      return(
        <Grid.Column key={note.id} mobile={16} tablet={8} computer={5}>
          <Note show={this.show} currentNote={note} />
        </Grid.Column>
      )
    })

    const filterLabels = this.props.searchDetails.filters.map((filter, i) => {
      return(
        <Label key={i} color='teal'>
          {filter.name}
          <Icon id={filter.name} name='delete' onClick={this.removeSearchFilter} />
        </Label>
      )
    })

    return(
      <div>
        {this.props.loading ?
          <Loading />
          :
          <Container style={{marginTop: '2rem'}}>
            <Grid columns='equal'>
              <Grid.Row className='search'>
                <Grid.Column style={{padding: '14px 0px'}}>
                  <Input fluid icon='search' placeholder='Search...' onChange={this.handleInputChange} />
                </Grid.Column>
                <Grid.Column width={1} style={{padding: '15px'}}>
                  <Dropdown icon='filter' floating button pointing className='icon teal top right'>
                    <Dropdown.Menu>
                      <Dropdown.Header content='Filter' />
                      <Dropdown.Divider />
                      <Dropdown.Item className='filter nested dropdown'>
                        <Dropdown icon='paint brush' pointing className='left'>
                          <Dropdown.Menu className='left'>
                            <Dropdown.Header content='By colour' />
                            <Dropdown.Divider />
                            <Dropdown.Item label={{ className: 'white', empty: true, circular: true }} text='White' onClick={this.addSearchFilter} />
                            <Dropdown.Item label={{ className: 'lightgreen', empty: true, circular: true }} text='Green' onClick={this.addSearchFilter} />
                            <Dropdown.Item label={{ className: 'lightskyblue', empty: true, circular: true }} text='Blue' onClick={this.addSearchFilter} />
                            <Dropdown.Item label={{ className: 'lightcoral', empty: true, circular: true }} text='Red' onClick={this.addSearchFilter} />
                            <Dropdown.Item label={{ className: 'yellow', empty: true, circular: true }} text='Yellow' onClick={this.addSearchFilter} />
                            <Dropdown.Item label={{ className: 'rosybrown', empty: true, circular: true }} text='Brown' onClick={this.addSearchFilter} />
                          </Dropdown.Menu>
                        </Dropdown>
                      </Dropdown.Item>
                      <Dropdown.Item className='filter nested dropdown'>
                        <Dropdown icon='user' pointing className='left'>
                          <Dropdown.Menu className='left'>
                            <Dropdown.Header content='By my permissions' />
                            <Dropdown.Divider />
                            <Dropdown.Item text='Owner' onClick={this.addSearchFilter} />
                            <Dropdown.Item text='Editor' onClick={this.addSearchFilter} />
                            <Dropdown.Item text='Viewer' onClick={this.addSearchFilter} />
                          </Dropdown.Menu>
                        </Dropdown>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className='search labels'>
                {filterLabels}
              </Grid.Row>
              <Grid.Row>
                {noteItems}
              </Grid.Row>
              <Grid.Row>
                {noteButton}
              </Grid.Row>
            </Grid>
          </Container>
        }
        {(this.props.currentNote.id !== '') &&
          <EditNote item={this.props.currentNote} open={this.state.open} close={this.close} />
        }
      </div>
    )
  }
}

// Maps state objects to props
const stateToProps = (state) => ({
  notes: state.note.notes,
  currentNote: state.note.currentNote,
  user: state.user,
  loading: state.note.loading,
  searchDetails: state.note.search,
  searchedNotes: getNotesByTerm(state)
})

// Maps dispatch functions to props
const dispatchToProps = (dispatch) => ({
  fetchNotes: (params) => dispatch(actions.fetchNotes(params)),
  addNote: (params) => dispatch(actions.addNote(params)),
  setCurrentNote: (params) => dispatch(actions.setCurrentNote(params)),
  setSearchTerm: (params) => dispatch(actions.setSearchTerm(params)),
  addSearchFilter: (params) => dispatch(actions.addSearchFilter(params)),
  removeSearchFilter: (params) => dispatch(actions.removeSearchFilter(params))
})

// Connects state and dispatch functions to this component
export default connect(stateToProps, dispatchToProps)(Notes)
