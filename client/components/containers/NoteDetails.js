import React, { Component } from 'react'
import axios from 'axios'

import { APIManager } from '../../utils'
import styles from '../../styles.js'

class NoteDetails extends Component {
  constructor(){
    super();

    this.state = {
      item: {
        id: "",
        title: "",
        body: ""
      }
    }
  }

  componentDidMount(){
    this.getNote();
  }

  getNote(){
    let noteId = this.props.match.params.id;
    APIManager.get(`/api/notes/${noteId}`, null, (error, response) => {
      if(error){
        console.log(error.message);
        return;
      }
      let originalItem = {
        id: response.result._id,
        title: response.result.title,
        body: response.result.body
      }
      this.setState({
        item: originalItem
      });
    });
  }

  handleInputChange(event){
    let editedNote = Object.assign({}, this.state.item);
    editedNote[event.target.id] = event.target.value;
    this.setState({
      item: editedNote
    });
  }

  editNote(){
    APIManager.put(`/api/notes/${this.state.item.id}`, {data: this.state.item}, (error, response) => {
      if(error){
        console.log(error.message);
        return;
      }
      this.props.history.push('/notes');
    });
  }

  render(){
    return(
      <div className="container" style={{padding: '15px'}}>
        <fieldset className="form-group" style={styles.universal.formGroup}>
          <label htmlFor="title" style={styles.universal.formLabel}>Title</label>
          <input id="title" onChange={this.handleInputChange.bind(this)} className="form-control"  style={styles.note.formInput} type="text" ref="title" value={this.state.item.title}></input>
        </fieldset>
        <fieldset className="form-group" style={styles.universal.formGroup}>
          <label htmlFor="body" style={styles.universal.formLabel}>Body</label>
          <input id="body" onChange={this.handleInputChange.bind(this)} className="form-control" style={styles.note.formInput} type="text" ref="body" value={this.state.item.body}></input>
        </fieldset>
        <button onClick={this.editNote.bind(this)} className="btn btn-info">Update Note</button>
      </div>
    )
  }
}

export default NoteDetails
