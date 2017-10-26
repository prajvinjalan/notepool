import React, { Component } from 'react'

import styles from '../../styles.js'

class NoteForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      newNote: {
        title: '',
        body: ''
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      newNote: nextProps.item
    });
  }

  handleInputChange(event){
    console.log(this.props.item);
    console.log(event.target.id + event.target.value);
    let updatedNote = Object.assign({}, this.state.newNote);
    updatedNote[event.target.id] = event.target.value;
    this.setState({
      newNote: updatedNote
    });
  }

  buttonClick(){
    this.props.buttonClick(this.state.newNote);
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
          <input id="body" className="form-control" style={styles.note.formInput} type="text" value={this.state.newNote.body} onChange={this.handleInputChange.bind(this)}></input>
        </fieldset>
        <button className="btn btn-info" onClick={this.buttonClick.bind(this)}>{this.props.buttonText}</button>
      </div>
    )
  }
}

export default NoteForm
