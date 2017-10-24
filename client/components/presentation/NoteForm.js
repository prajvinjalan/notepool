import React, { Component } from 'react'

import styles from '../../styles.js'

class NoteForm extends Component {
  handleInputChange(event){
    this.props.handleInputChange(event);
  }
  render(){
    return(
      <div className="container" style={{padding: '15px'}}>
        <h1>{this.props.header}</h1>
        <fieldset className="form-group" style={styles.universal.formGroup}>
          <label htmlFor="title" style={styles.universal.formLabel}>Title</label>
          <input id="title" onChange={this.handleInputChange.bind(this)} className="form-control"  style={styles.note.formInput} type="text" value={this.props.item.title}></input>
        </fieldset>
        <fieldset className="form-group" style={styles.universal.formGroup}>
          <label htmlFor="body" style={styles.universal.formLabel}>Body</label>
          <input id="body" onChange={this.handleInputChange.bind(this)} className="form-control" style={styles.note.formInput} type="text" value={this.props.item.body}></input>
        </fieldset>
        <button onClick={this.props.buttonClick} className="btn btn-info">{this.props.buttonText}</button>
      </div>
    )
  }
}

export default NoteForm
