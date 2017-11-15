import React, { Component } from 'react'
import { Button, Icon, Input, Modal } from 'semantic-ui-react'

class EditCollaborators extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: ''
    }
  }

  close = (event) => {
    if (event.currentTarget.id === 'save'){
      this.props.close(this.state.email);
    } else {
      this.props.close();
    }
  }

  handleInputChange = (event) => {
    this.setState({
      email: event.target.value
    });
  }

  render() {
    return (
      <Modal dimmer='inverted' open={this.props.open} onClose={this.close} size='small' >
        <Modal.Header>Add Collaborator</Modal.Header>
        <Modal.Content>
          <Input fluid placeholder='Enter an email...' onChange={this.handleInputChange} />
        </Modal.Content>
        <Modal.Actions>
          <Button id='save' icon='check' onClick={this.close} />
          <Button id='discard' icon='remove' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default EditCollaborators
