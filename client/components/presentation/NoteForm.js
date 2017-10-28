import React, { Component } from 'react'

import styles from '../../styles.js'

class NoteForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      newNote: {
        title: '',
        body: '',
        colour: ''
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      newNote: nextProps.item
    });
  }

  handleInputChange(event){
    let updatedNote = Object.assign({}, this.state.newNote);
    updatedNote[event.target.id] = event.target.value;
    this.setState({
      newNote: updatedNote
    });
  }

  buttonClick(){
    let note = Object.assign({}, this.state.newNote);
    this.props.buttonClick(note);
  }

  render(){
    return(
      <div className="container" style={{padding: '15px'}}>
        <h1>{this.props.header}</h1>
        <fieldset className="form-group" style={styles.universal.formGroup}>
          <label htmlFor="title" style={styles.universal.formLabel}>Title</label>
          <input id="title" className="form-control"  style={styles.note.formInput} type="text" value={this.state.newNote.title} onChange={this.handleInputChange.bind(this)}></input>
        </fieldset>
        <fieldset className="form-group" style={styles.universal.formGroup}>
          <label htmlFor="body" style={styles.universal.formLabel}>Body</label>
          <textarea id="body" className="form-control" style={styles.note.bodyInput} type="text" value={this.state.newNote.body} onChange={this.handleInputChange.bind(this)}></textarea>
        </fieldset>
        <button className="btn btn-info" onClick={this.buttonClick.bind(this)}>{this.props.buttonText}</button>
      </div>
    )
  }
}

export default NoteForm
