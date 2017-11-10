import React, { Component } from 'react'

import styles from '../../styles.js'

class CollaboratorForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: ''
    }
  }

  handleInputChange(event){
    this.setState({
      email: event.target.value
    });
  }

  buttonClick(){
    this.props.buttonClick(this.state.email);
  }

  render(){
    return(
      <div style={{float: 'right', paddingLeft: '20px'}}>
        <fieldset className="form-group" style={{...styles.universal.formGroup, ...{float: 'left'}}}>
          <label htmlFor="body" style={{...styles.universal.formLabel, ...{left: '0'}}}>Email</label>
          <input id="body" className="form-control" style={{...styles.note.formInput, ...{height: '35px'}}} type="text" onChange={this.handleInputChange.bind(this)}></input>
        </fieldset>
        <button className="btn btn-info" onClick={this.buttonClick.bind(this)}>Add</button>
      </div>
    )
  }
}

export default CollaboratorForm
