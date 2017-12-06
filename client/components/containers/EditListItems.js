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
          body: '',
          checked: false
        }
      ]
    }
  }

  handleInputChange = (index) => (event) => {
    const newItems = this.state.items.map((item, i) => {
      if (index !== i){
        return item;
      }
      return {...item, body: event.target.value};
    });

    this.setState({
      items: newItems
    });
  }

  checkItem = (index) => (event) => {
    document.getElementById(`input-${index}`).classList.toggle('checked');

    const newItems = this.state.items.map((item, i) => {
      if (index !== i){
        return item;
      }
      return {...item, checked: !this.state.items[i].checked};
    });

    this.setState({
      items: newItems
    });
  }

  addItem = (event) => {
    const newItems = this.state.items.concat([{ body: '' }]);

    this.setState({
      items: newItems
    });
  }

  removeItem = (index) => (event) => {
    const newItems = this.state.items.filter((item, i) => i !== index);

    this.setState({
      items: newItems
    });
  }

  render(){
    const listItems = this.state.items.map((item, i) => {
      return(
        <div key={i}>
          <Checkbox className='list-item' onClick={this.checkItem(i)} />
          <Input id={`input-${i}`} placeholder='Add Item...' value={item.body} onChange={this.handleInputChange(i)} className='list-item'
            icon={<Icon link name='remove circle' onClick={this.removeItem(i)} />}
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

// // Maps dispatch functions to props
// const dispatchToProps = (state) => ({
//
// })

// Connects state and dispatch functions to this component
export default connect(stateToProps, null)(EditListItems)
