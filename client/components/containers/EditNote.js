import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Dropdown, Form, Grid, Icon, Input, Label, Modal, TextArea } from 'semantic-ui-react'

import * as actions from '../../redux/actions'

import EditCollaborators from './EditCollaborators'

class EditNote extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      body: '',
      open: false
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      title: nextProps.item.title,
      body: nextProps.item.body
    });
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    }, () => {
      this.props.setCurrentNote({...this.props.currentNote, ...{title: this.state.title, body: this.state.body}})
    });
  }

  updateColour = (event) => {
    let currentButton = event.currentTarget.id;
    let selectedButton = document.querySelectorAll('.colour-selected');
    if (selectedButton[0]){
      selectedButton[0].classList.remove('colour-selected');
    }
    document.getElementById(currentButton).classList.toggle('colour-selected');

    let elements = document.querySelectorAll('.' + this.props.currentNote.colour);
    for (let i = 0; i < elements.length; i++){
      if (elements[i].classList.contains('modal')){
        elements[i].classList.remove(this.props.currentNote.colour);
        elements[i].classList.add(currentButton);
      }
    }

    if(this.props.currentNote.colour !== currentButton){
      let note = {...this.props.currentNote, ...{colour: currentButton}};
      this.props.setCurrentNote(note);
    }
  }

  removeCollaborator = (event) => {
    this.props.removeCollaborator({id: this.props.currentNote.id, email: event.target.id, note: this.props.currentNote});
  }

  delete = () => {
    // if (this.props.currentNote.id){ // delete note if it has been created (no id if note wasn't added)
    //   this.props.deleteNote(this.props.currentNote.id);
    // }
    this.props.deleteNote(this.props.currentNote);
    this.props.close();
  }

  close = () => {
    const note = {...this.props.currentNote, ...{title: this.state.title, body: this.state.body}};
    // if (note) { // undefined if closing on delete note button
    //   if (note.id) { // if this note already exists
    //     this.props.updateNote(note);
    //   } else { // if this is a new note it won't have an id
    //     this.props.addNote(note);
    //   }
    // }
    this.props.updateNote(note);
    this.props.close();
  }

  showCollab = () => {
    this.setState({
      open: true
    });
  }

  closeCollab = () => {
    this.setState({
      open: false,
    });
  }

  render(){
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

    const collabList = (this.props.currentNote.collaborators !== undefined ?
      this.props.currentNote.collaborators.map((collaborator, i) => {
        return(
          <Label key={i}>
            {collaborator} <Icon id={collaborator} name='delete' onClick={this.removeCollaborator} />
          </Label>
        )
      })
      : '')

    return(
      <Modal dimmer='inverted' open={this.props.open} onClose={this.close} className={this.props.currentNote.colour}>
        <Modal.Header>
          <Input id='title' fluid placeholder='Title' defaultValue={this.props.currentNote.title} onChange={this.handleInputChange} />
        </Modal.Header>
        <Modal.Content className='with-border'>
          <Modal.Description>
            <Form>
              <TextArea id='body' autoHeight defaultValue={this.props.currentNote.body} onChange={this.handleInputChange} />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Content>
          <Modal.Description>
            {collabList}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Grid columns='equal'>
            <Grid.Column textAlign='left'>
              <Dropdown floating button className='icon inverted green bottom left' icon='paint brush' pointing>
                <Dropdown.Menu>
                  <Dropdown.Item className='with-grid'>{colourList_1}</Dropdown.Item>
                  <Dropdown.Item className='with-grid'>{colourList_2}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button inverted color='green' icon='add user' onClick={this.showCollab} />
              <EditCollaborators open={this.state.open} close={this.closeCollab} />
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button inverted color='red' icon='trash' onClick={this.delete} />
            </Grid.Column>
          </Grid>
        </Modal.Actions>
      </Modal>
    )
  }
}

const stateToProps = (state) => ({
  user: state.user,
  currentNote: state.note.currentNote,
  notesById: state.note.notesById
})

const dispatchToProps = (dispatch) => ({
  updateNote: (params) => dispatch(actions.updateNote(params)),
  deleteNote: (params) => dispatch(actions.deleteNote(params)),
  removeCollaborator: (params) => dispatch(actions.removeCollaborator(params)),
  setCurrentNote: (params) => dispatch(actions.setCurrentNote(params))
})

export default connect(stateToProps, dispatchToProps)(EditNote)
