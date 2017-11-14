import React, { Component } from 'react'
import { Button, Dropdown, Form, Grid, Icon, Input, Label, Modal, TextArea } from 'semantic-ui-react'

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
    if (this.state.note.id){ // delete note if it has been created (no id if note wasn't added)
      this.props.deleteNote(this.state.note.id);
    }
    this.props.close();
  }

  updateColour = (event) => {
    let currentButton = event.currentTarget.id;
    let selectedButton = document.querySelectorAll('.colour-selected');
    if (selectedButton[0]){
      selectedButton[0].classList.remove('colour-selected');
    }
    document.getElementById(currentButton).classList.toggle('colour-selected');

    let elements = document.querySelectorAll('.' + this.state.note.colour);
    for (let i = 0; i < elements.length; i++){
      if (elements[i].classList.contains('modal')){
        elements[i].classList.remove(this.state.note.colour);
        elements[i].classList.add(currentButton);
      }
    }

    if(this.state.note.colour !== currentButton){
      this.setState({
        note: {...this.state.note, ...{colour: currentButton}}
      });
    }
  }

  render(){
    const colours_1 = ['white', 'lightgreen', 'lightskyblue'];
    const colours_2 = ['lightcoral', 'yellow', 'rosybrown'];

    const colourList_1 = colours_1.map((colour, i) => {
      return(
        <Button key={i} circular icon='check' id={colour} className={this.state.note.colour === colour ? 'colour-selected' : ''} onClick={this.updateColour.bind(this)} />
      )
    })

    const colourList_2 = colours_2.map((colour, i) => {
      return(
        <Button key={i} circular icon='check' id={colour} className={this.state.note.colour === colour ? 'colour-selected' : ''} onClick={this.updateColour.bind(this)} />
      )
    })

    return(
      <Modal dimmer='inverted' open={this.props.open} onClose={this.close.bind(this)} className={this.props.item.colour}>
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
            <Label>Collaborators</Label>
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
