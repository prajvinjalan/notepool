import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Input, Modal } from 'semantic-ui-react'

import * as actions from '../../redux/actions'

class EditCollaborators extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: ''
    }
  }

  close = (event) => {
    if (event.currentTarget.id === 'save'){
      this.props.addCollaborator({id: this.props.currentNote.id, email: this.state.email});
    }
    this.props.close();
  }

  handleInputChange = (event) => {
    this.setState({
      email: event.target.value
    });

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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

  render() {
    return (
      <Modal dimmer='inverted' open={this.props.open} onClose={this.close} size='small' >
        <Modal.Header>Add Collaborator</Modal.Header>
        <Modal.Content>
          <Input id='email-input' fluid placeholder='Enter an email...' onChange={this.handleInputChange} />
        </Modal.Content>
        <Modal.Actions>
          <Button id='save' className='disabled' icon='check' onClick={this.close} />
          <Button id='discard' icon='remove' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  }
}

const stateToProps = (state) => ({
  currentNote: state.note.currentNote
})

const dispatchToProps = (dispatch) => ({
  addCollaborator: (params) => dispatch(actions.addCollaborator(params))
})

export default connect(stateToProps, dispatchToProps)(EditCollaborators)
