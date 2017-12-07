import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Dropdown, Grid, Icon, Input, Modal } from 'semantic-ui-react'

import * as actions from '../../redux/actions'

class EditCollaborators extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      value: 'Editor'
    }
  }

  // Closes the collaborator form
  close = (event) => {
    // If block that contains conditions for (1. save unique email, 2. save but duplicate email, 3. discard)
    if (event.currentTarget.id === 'save' && !this.isDuplicateCollaborator()){
      this.props.addCollaborator({
        id: this.props.currentNote.id,
        collaborator: {
          email: this.state.email,
          type: this.state.value
        },
        note: this.props.currentNote
      });
      this.props.close();
    } else if (event.currentTarget.id === 'save' && this.isDuplicateCollaborator()){
      console.log('dupe');
    } else {
      this.props.close();
    }
  }

  // Determines whether the current email is already a collaborator
  isDuplicateCollaborator = () => {
    for (let i = 0; i < this.props.currentNote.collaborators.length; i++){
      if (this.state.email === this.props.currentNote.collaborators[i].email){
        return true;
      }
    }
    return false;
  }

  // Handles changes to email input
  handleInputChange = (event) => {
    this.setState({
      email: event.target.value
    });

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // If block that contains conditions for (1. valid email, 2. empty input, 3. invalid email)
    if (event.target.value.match(emailRegex)){
      document.getElementById('save').classList.remove('disabled');
      document.getElementById('email-input').classList.remove('error');
      document.getElementById('email-input').classList.add('success');
    } else if (event.target.value === ''){
      document.getElementById('save').classList.add('disabled');
      document.getElementById('email-input').classList.remove('error');
      document.getElementById('email-input').classList.remove('success');
    } else {
      document.getElementById('save').classList.add('disabled');
      document.getElementById('email-input').classList.add('error');
      document.getElementById('email-input').classList.remove('success');
    }
  }

  // Handles change to dropdown (add collaborator as Editor or Viewer)
  handleDropdownChange = (event, { value }) => {
    this.setState({
      value: value
    });
  }

  render() {
    const options = [
      {key: 1, text: 'Editor', value: 'Editor'},
      {key: 2, text: 'Viewer', value: 'Viewer'}
    ]

    return (
      <Modal dimmer='inverted' open={this.props.open} onClose={this.close} size='small' >
        <Modal.Header>Add Collaborator</Modal.Header>
        <Modal.Content>
          <Grid columns='equal'>
            <Grid.Column textAlign='left'>
              <Input id='email-input' fluid placeholder='Enter an email...' onChange={this.handleInputChange} />
            </Grid.Column>
            <Grid.Column textAlign='right' width={4}>
              <Dropdown value={this.state.value} fluid selection options={options} onChange={this.handleDropdownChange} />
            </Grid.Column>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button id='save' className='disabled' icon='check' onClick={this.close} />
          <Button id='discard' icon='remove' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  }
}

// Maps state objects to props
const stateToProps = (state) => ({
  currentNote: state.note.currentNote
})

// Maps dispatch functions to props
const dispatchToProps = (dispatch) => ({
  addCollaborator: (params) => dispatch(actions.addCollaborator(params))
})

// Connects state and dispatch functions to this component
export default connect(stateToProps, dispatchToProps)(EditCollaborators)
