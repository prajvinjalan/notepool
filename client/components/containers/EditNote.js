import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Dropdown, Form, Grid, Icon, Input, Label, Modal, TextArea } from 'semantic-ui-react'

import * as actions from '../../redux/actions'

import EditCollaborators from './EditCollaborators'
import EditListItems from './EditListItems'

// This component mounts when the Notes component mounts - it changes visibility and content based on user interaction
class EditNote extends Component {
  constructor(props){
    super(props);

    this.state = {
      open: false
    }
  }

  // Handles changes to title and body inputs
  handleInputChange = (event) => {
    // Sets the current note with an updated value
    this.props.setCurrentNote({...this.props.currentNote, ...{[event.target.id]: event.target.value}});
  }

  // Updates the note's colour based on the button clicked
  updateColour = (event) => {
    let currentButton = event.currentTarget.id;

    // Runs through if block when the colour selected is a new one
    if(this.props.currentNote.colour !== currentButton){
      // "De-selects" the originally selected button (will always be an array of one button)
      let selectedButton = document.querySelectorAll('.colour-selected');
      if (selectedButton[0]){
        selectedButton[0].classList.remove('colour-selected');
      }
      // "Selects" the clicked button
      document.getElementById(currentButton).classList.toggle('colour-selected');

      // Updates the modal colour
      let elements = document.querySelectorAll('.' + this.props.currentNote.colour);
      for (let i = 0; i < elements.length; i++){
        if (elements[i].classList.contains('modal')){
          elements[i].classList.remove(this.props.currentNote.colour);
          elements[i].classList.add(currentButton);
        }
      }

      // Sets the current note with an updated colour
      let note = {...this.props.currentNote, ...{colour: currentButton}};
      this.props.setCurrentNote(note);
    }
  }

  // Removes the collaborator associated with the clicked label
  removeCollaborator = (event) => {
    this.props.removeCollaborator({id: this.props.currentNote.id, email: event.target.id, note: this.props.currentNote});
  }

  // Deletes the currently opened note
  delete = () => {
    this.props.deleteNote(this.props.currentNote);
    this.props.close();
  }

  // Closes the currently opened note (on outer click or 'Escape' key click)
  close = () => {
    this.props.updateNote(this.props.currentNote); // Updates the note (API call)
    this.props.close();
  }

  // Opens the 'Edit Collaborator' modal
  showCollab = () => {
    this.setState({
      open: true
    });
  }

  // Closes the 'Edit Collaborator' modal
  closeCollab = () => {
    this.setState({
      open: false,
    });
  }

  // Checks whether the current user is the owner
  isOwner = () => {
    if (this.props.currentNote){
      return ((this.props.currentNote.collaborators.filter(collaborator => collaborator.email === this.props.user.email))[0].type === 'Owner');
    }
  }

  // Checks whether the current user is an editor
  isEditor = () => {
    if (this.props.currentNote){
      return ((this.props.currentNote.collaborators.filter(collaborator => collaborator.email === this.props.user.email))[0].type === 'Editor');
    }
  }

  // Checks whether the current user is a viewer
  isViewer = () => {
    if (this.props.currentNote){
      return ((this.props.currentNote.collaborators.filter(collaborator => collaborator.email === this.props.user.email))[0].type === 'Viewer');
    }
  }

  // Changes the type of the note (from text to list and vice-versa)
  switchType = () => {
    this.props.switchType(this.props.currentNote);
  }

  render(){
    // Creates colour change buttons
    const colours_1 = ['white', 'lightgreen', 'lightskyblue'];
    const colours_2 = ['lightcoral', 'yellow', 'rosybrown'];

    const colourList_1 = colours_1.map((colour, i) => {
      return(
        <Button key={i} circular icon='check' id={colour} className={this.props.currentNote.colour === colour ? 'colour-selected' : ''} onClick={this.updateColour} />
      )
    })

    const colourList_2 = colours_2.map((colour, i) => {
      return(
        <Button key={i} circular icon='check' id={colour} className={this.props.currentNote.colour === colour ? 'colour-selected' : ''} onClick={this.updateColour} />
      )
    })

    // Creates a list of labels for the current note's collaborators (with an icon for removing collaborators)
    const collabList = (this.props.currentNote.collaborators !== undefined ?
      this.props.currentNote.collaborators.map((collaborator, i) => {
        return(
          <Label key={i} color='teal'>
            {collaborator.email}
            <Label.Detail content={collaborator.type} />
            {
              ((collaborator.type !== 'Owner') &&
              !this.isViewer() &&
              (collaborator.email !== this.props.user.email))
              && <Icon id={collaborator.email} name='delete' onClick={this.removeCollaborator} />
            }
          </Label>
        )
      })
      : '')

    return(
      <Modal dimmer='inverted' open={this.props.open} onClose={this.close} className={this.props.currentNote.colour}>
        <Modal.Header className={'without-border ' + (this.isViewer() ? 'viewer' : '')}>
          <Input id='title' fluid placeholder='Title' value={this.props.currentNote.title} onChange={this.handleInputChange} />
        </Modal.Header>
        <Modal.Content className='with-border'>
          <Modal.Description className={this.isViewer() ? 'viewer' : ''}>
            {this.props.currentNote.type === 'text' ?
            <Form>
              <TextArea id='body' autoHeight value={this.props.currentNote.body} onChange={this.handleInputChange} />
            </Form>
            : <EditListItems />}
          </Modal.Description>
        </Modal.Content>
        <Modal.Content>
          <Modal.Description>
            {collabList}
          </Modal.Description>
        </Modal.Content>
        {!this.isViewer() &&
          <Modal.Actions>
            <Grid columns='equal'>
              <Grid.Column textAlign='left'>
                <Dropdown id='colour-dropdown' floating button className='icon inverted green bottom left' icon='paint brush' pointing>
                  <Dropdown.Menu>
                    <Dropdown.Item className='with-grid'>{colourList_1}</Dropdown.Item>
                    <Dropdown.Item className='with-grid'>{colourList_2}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button inverted color='green' icon='add user' onClick={this.showCollab} />
                <Button inverted color='green' icon={this.props.currentNote.type === 'text' ? 'list' : 'sticky note'} onClick={this.switchType} />
                <EditCollaborators open={this.state.open} close={this.closeCollab} />
              </Grid.Column>
              {this.isOwner() &&
                <Grid.Column textAlign='right'>
                  <Button inverted color='red' icon='trash' onClick={this.delete} />
                </Grid.Column>
              }
            </Grid>
          </Modal.Actions>
        }
      </Modal>
    )
  }
}

// Maps state objects to props
const stateToProps = (state) => ({
  user: state.user,
  currentNote: state.note.currentNote,
  notesById: state.note.notesById
})

// Maps dispatch functions to props
const dispatchToProps = (dispatch) => ({
  updateNote: (params) => dispatch(actions.updateNote(params)),
  deleteNote: (params) => dispatch(actions.deleteNote(params)),
  removeCollaborator: (params) => dispatch(actions.removeCollaborator(params)),
  setCurrentNote: (params) => dispatch(actions.setCurrentNote(params)),
  switchType: (params) => dispatch(actions.switchType(params))
})

// Connects state and dispatch functions to this component
export default connect(stateToProps, dispatchToProps)(EditNote)
