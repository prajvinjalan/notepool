import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox, Divider, Icon, Input } from 'semantic-ui-react'

import * as actions from '../../redux/actions'

class EditListItems extends Component {
  constructor(props){
    super(props);
  }

  // Handles changes to item inputs in body
  handleInputChange = (index) => (event) => {
    this.props.updateItem({note: this.props.currentNote, text: event.target.value, index: index});
  }

  // Handles keyup events for inputs
  handleKeyUp = (index) => (event) => {
    if (event.keyCode === 13){ // pressed Enter key
      // going through unchecked items
      if (!this.props.currentNote.listBody[index].checked){
        // Add new input if at last unchecked item, otherwise go to next unchecked input
        if (!this.getNextUncheckedItemIndex(index)){
          this.props.addItem({note: this.props.currentNote})
          .then(() => {
            document.getElementById(`input-${this.getNextUncheckedItemIndex(index)}`).focus();
          });
        } else {
          document.getElementById(`input-${this.getNextUncheckedItemIndex(index)}`).focus();
        }
      } else { // going through checked items
        // Go to next checked input if it exists
        if (this.getNextCheckedItemIndex(index)){
          document.getElementById(`input-${this.getNextCheckedItemIndex(index)}`).focus();
        }
      }
    }
    if (event.keyCode === 8){ // pressed Backspace key
      // going through unchecked items
      if (!this.props.currentNote.listBody[index].checked){
        // Go to previous/next unchecked input if input is empty and list has more items
        if ((this.props.currentNote.listBody.length !== 1) && (event.target.value === '')){
          this.props.removeItem({note: this.props.currentNote, index: index})
          .then(() => {
            if (this.getPreviousUncheckedItemIndex(index)){ // go to the previous unchecked item
              document.getElementById(`input-${this.getPreviousUncheckedItemIndex(index)}`).focus();
            } else if (this.getNextUncheckedItemIndex(index)){ // go to the next unchecked item if there is no previous
              document.getElementById(`input-${this.getNextUncheckedItemIndex(index)}`).focus();
            } else { // go to the first checked item since this is the last unchecked item
              document.getElementById(`input-${0}`).focus();
            }
          });
        }
      } else { // going through checked items
        // Go to previous/next checked input if input is empty and list has more items
        if ((this.props.currentNote.listBody.length !== 1) && (event.target.value === '')){
          this.props.removeItem({note: this.props.currentNote, index: index})
          .then(() => {
            if (this.getPreviousCheckedItemIndex(index)){ // go to the previous checked item
              document.getElementById(`input-${this.getPreviousCheckedItemIndex(index)}`).focus();
            } else if (this.getNextCheckedItemIndex(index - 1)){ // go to the next checked item if there is no previous (but start at the spot that the removed item was at)
              document.getElementById(`input-${this.getNextCheckedItemIndex(index - 1)}`).focus();
            } else { // go to the first unchecked item since this is the last checked item
              document.getElementById(`input-${0}`).focus();
            }
          });
        }
      }
    }
  }

  // Returns the index of the next unchecked item in the list
  getNextUncheckedItemIndex = (index) => {
    for (let i = index + 1; i < this.props.currentNote.listBody.length; i++){
      if (!this.props.currentNote.listBody[i].checked){
        return i;
      }
    }
    return false; // if there is no next unchecked item, returns false (last item)
  }

  // Returns the index of the next checked item in the list
  getNextCheckedItemIndex = (index) => {
    for (let i = index + 1; i < this.props.currentNote.listBody.length; i++){
      if (this.props.currentNote.listBody[i].checked){
        return i;
      }
    }
    return false; // if there is no next checked item, returns false (last item)
  }

  // Returns the index of the previous unchecked item in the list
  getPreviousUncheckedItemIndex = (index) => {
    for (let i = index - 1; i >= 0; i--){
      if (!this.props.currentNote.listBody[i].checked){
        return i;
      }
    }
    return false; // if there is no previous unchecked item, returns false (last item)
  }

  // Returns the index of the previous checked item in the list
  getPreviousCheckedItemIndex = (index) => {
    for (let i = index - 1; i >= 0; i--){
      if (this.props.currentNote.listBody[i].checked){
        return i;
      }
    }
    return false; // if there is no previous checked item, returns false (last item)
  }

  // Adds an input to the list of items
  addItem = (event) => {
    this.props.addItem({note: this.props.currentNote})
    .then(() => {
      document.getElementById(`input-${this.props.currentNote.listBody.length - 1}`).focus();
    });
  }

  // Removes an input from the list of items
  removeItem = (index) => (event) => {
    this.props.removeItem({note: this.props.currentNote, index: index});
  }

  // Toggles the input and based on the checkbox
  checkItem = (index) => (event) => {
    document.getElementById(`input-${index}`).parentElement.classList.toggle('checked');
    this.props.checkItem({note: this.props.currentNote, index: index});
  }

  // Occurs when an input is focused
  onFocus = (event) => {
    document.getElementById(event.target.id).classList.add('selected');
    document.getElementById(event.target.id).parentElement.parentElement.classList.add('selected');
  }

  // Occurs when an input loses focus
  onBlur = (event) => {
    document.getElementById(event.target.id).classList.remove('selected');
    document.getElementById(event.target.id).parentElement.parentElement.classList.remove('selected');
  }

  // Checks whether the current user is a viewer
  isViewer = () => {
    if (this.props.currentNote){
      return ((this.props.currentNote.collaborators.filter(collaborator => collaborator.email === this.props.user.email))[0].type === 'Viewer');
    }
  }

  render(){
    // Array of all unchecked list items
    const uncheckedItems = this.props.currentNote.listBody.map((item, i) => {
      if (!item.checked){
        return(
          <div key={i} className='list-item-container'>
            <Checkbox className='list-item' checked={item.checked} onClick={this.checkItem(i)} />
            <Input id={`input-${i}`} value={item.text} onKeyUp={this.handleKeyUp(i)}
              onChange={this.handleInputChange(i)} onFocus={this.onFocus} onBlur={this.onBlur}
              className={'list-item ' + (item.checked ? 'checked' : '')}
              icon={(this.props.currentNote.listBody.length !== 1) && <Icon link name='remove circle' onMouseDown={this.removeItem(i)} />}
            />
          </div>
        )
      }
    })

    // Array of all checked list items
    const checkedItems = this.props.currentNote.listBody.map((item, i) => {
      if (item.checked){
        return(
          <div key={i} className='list-item-container'>
            <Checkbox className='list-item' checked={item.checked} onClick={this.checkItem(i)} />
            <Input id={`input-${i}`} value={item.text} onKeyUp={this.handleKeyUp(i)}
              onChange={this.handleInputChange(i)} onFocus={this.onFocus} onBlur={this.onBlur}
              className={'list-item ' + (item.checked ? 'checked' : '')}
              icon={(this.props.currentNote.listBody.length !== 1) && <Icon link name='remove circle' onMouseDown={this.removeItem(i)} />}
            />
          </div>
        )
      }
    })

    // Whether or not every value in the unchecked item list is undefined (therefore no unchecked items)
    const isUncheckedItemsUndefined = uncheckedItems.every((value) => {
      return value === undefined;
    })

    // Whether or not every value in the checked item list is undefined (therefore no checked items)
    const isCheckedItemsUndefined = checkedItems.every((value) => {
      return value === undefined;
    })

    return(
      <div>
        {(!isUncheckedItemsUndefined) && uncheckedItems}
        <div className='list-items-button-container'>
          {!this.isViewer() && <Button circular icon='plus' size='small' color='teal' className='right-aligned-button' onClick={this.addItem}></Button>}
        </div>
        {(!isCheckedItemsUndefined) && <span className='subtitle'>Checked Items</span>}
        {(!isCheckedItemsUndefined) && <Divider />}
        {(!isCheckedItemsUndefined) && checkedItems}
      </div>
    )
  }
}

// Maps state objects to props
const stateToProps = (state) => ({
  currentNote: state.note.currentNote,
  user: state.user
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
