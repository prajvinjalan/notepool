import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox, Icon, Input } from 'semantic-ui-react'

import * as actions from '../../redux/actions'

class EditListItems extends Component {
  constructor(props){
    super(props);

    this.state = {
      items: [
        {
          text: '',
          checked: false
        }
      ]
    }
  }

  // Handles changes to item inputs in body
  handleInputChange = (index) => (event) => {
    // const newItems = this.state.items.map((item, i) => {
    //   if (index !== i){
    //     return item;
    //   }
    //   return {...item, text: event.target.value};
    // });
    //
    // this.setState({
    //   items: newItems
    // });
    this.props.updateItem({note: this.props.currentNote, text: event.target.value, index: index});
  }

  // Handles keydown events for inputs
  handleKeyDown = (index) => (event) => {
    if (event.keyCode === 13){ // pressed Enter key
      // Add new input if at last one, otherwise go to next input
      if (index === (this.props.currentNote.listBody.length - 1)){
        this.props.addItem({note: this.props.currentNote})
        .then(() => {
          document.getElementById(`input-${index + 1}`).focus();
        });
      } else {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
    if (event.keyCode === 8){ // pressed Backspace key

    }
  }

  // Adds an input to the list of items
  addItem = (event) => {
    // const newItems = this.state.items.concat([{ text: '' }]);
    //
    // this.setState({
    //   items: newItems
    // });
    this.props.addItem({note: this.props.currentNote})
    .then(() => {
      document.getElementById(`input-${this.props.currentNote.listBody.length - 1}`).focus();
    });
  }

  // Removes an input from the list of items
  removeItem = (index) => (event) => {
    // const newItems = this.state.items.filter((item, i) => i !== index);
    //
    // this.setState({
    //   items: newItems
    // });
    this.props.removeItem({note: this.props.currentNote, index: index});
  }

  // Toggles the input and based on the checkbox
  checkItem = (index) => (event) => {
    document.getElementById(`input-${index}`).parentElement.classList.toggle('checked');

    // const newItems = this.state.items.map((item, i) => {
    //   if (index !== i){
    //     return item;
    //   }
    //   return {...item, checked: !this.state.items[i].checked};
    // });
    //
    // this.setState({
    //   items: newItems
    // });
    console.log('note', this.props.currentNote);
    this.props.checkItem({note: this.props.currentNote, index: index});
  }

  // Occurs when an input is focused
  onFocus = (event) => {
    document.getElementById(event.target.id).classList.add('selected');
  }

  // Occurs when an input loses focus
  onBlur = (event) => {
    document.getElementById(event.target.id).classList.remove('selected');
  }

  render(){
    const listItems = this.props.currentNote.listBody.map((item, i) => {
      return(
        <div key={i}>
          <Checkbox className='list-item' defaultChecked={item.checked} onClick={this.checkItem(i)} />
          <Input id={`input-${i}`} placeholder='Add Item...' value={item.text}
            onChange={this.handleInputChange(i)} onFocus={this.onFocus} onBlur={this.onBlur}
            onKeyDown={this.handleKeyDown(i)} className={'list-item ' + (item.checked ? 'checked' : '')}
            icon={<Icon link name='remove circle' onMouseDown={this.removeItem(i)} />}
          />
        </div>
      )
    })

    return(
      <div>
        {listItems}
        <div className='list-items-button-container'>
          <Button circular icon='plus' size='small' color='teal' className='right-aligned-button' onClick={this.addItem}></Button>
        </div>
      </div>
    )
  }
}

// Maps state objects to props
const stateToProps = (state) => ({
  currentNote: state.note.currentNote
})

// Maps dispatch functions to props
const dispatchToProps = (dispatch) => ({
  addItem: (params) => dispatch(actions.addItem(params)),
  updateItem: (params) => dispatch(actions.updateItem(params)),
  removeItem: (params) => dispatch(actions.removeItem(params)),
  checkItem: (params) => dispatch(actions.checkItem(params))
})

// Connects state and dispatch functions to this component
export default connect(stateToProps, dispatchToProps)(EditListItems)
