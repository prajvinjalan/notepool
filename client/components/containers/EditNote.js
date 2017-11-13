import React, { Component } from 'react'
import { Button, Dropdown, Form, Grid, Input, Modal, TextArea } from 'semantic-ui-react'

import styles from '../../styles.js'

class EditNote extends Component {
  constructor(props){
    super(props);

    this.state = {
      note: {
        id: '',
        title: '',
        body: '',
        colour: '',
        collaborators: []
      }
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      note: nextProps.item
    });
  }

  handleInputChange = (event) => {
    let updatedNote = {...this.state.note};
    updatedNote[event.target.id] = event.target.value;
    this.setState({
      note: updatedNote
    });
  }

  close = () => {
    this.props.close(this.state.note);
  }

  delete = () => {
    this.props.deleteNote(this.state.note.id);
    this.props.close();
  }

  render(){
    return(
      <Modal dimmer='inverted' open={this.props.open} onClose={this.close.bind(this)}>
        <Modal.Header>
          <Input id='title' fluid defaultValue={this.props.item.title} onChange={this.handleInputChange.bind(this)} />
        </Modal.Header>
        <Modal.Content className='with-border'>
          <Modal.Description>
            <Form>
              <TextArea id='body' autoHeight defaultValue={this.props.item.body} onChange={this.handleInputChange.bind(this)} />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Content>
          <Modal.Description>
            Collaborators
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Grid columns='equal'>
            <Grid.Column textAlign='left'>
              <Dropdown floating button className='icon inverted green bottom left' icon='paint brush' pointing>
                <Dropdown.Menu>
                  <Dropdown.Item icon='user' text='Details' />
                  <Dropdown.Item icon='setting' text='Settings' />
                  <Dropdown.Item icon='sign out' text='Logout' />
                </Dropdown.Menu>
              </Dropdown>
              <Button inverted color='green' icon='add user' onClick={this.close.bind(this)} />
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button inverted color='red' icon='remove' onClick={this.delete.bind(this)} />
            </Grid.Column>
          </Grid>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default EditNote
