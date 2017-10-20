import React, { Component } from 'react'
import axios from 'axios'

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
    axios.get(`/api/notes/${noteId}`)
      .then(response => {
        console.log(response.data.result);
        let originalItem = {
          id: response.data.result._id,
          title: response.data.result.title,
          body: response.data.result.body
        }
        this.setState({
          item: originalItem
        });
        console.log(this.state.item);
      })
      .catch(error => {
        console.log(error);
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
    let editedNote = Object.assign({}, this.state.item);
    this.setState({
      item: editedNote
    });
    console.log(this.state.item);

    axios.request({
      method: 'put',
      url: `/api/notes/${this.state.item.id}`,
      data: this.state.item
    })
    .then(response => {
      this.props.history.push('/notes');
    })
    .catch(error => {
      console.log(error);
    })
  }

  render(){
    return(
      <div className="container">
        <label htmlFor="title">Title</label>
        <input id="title" onChange={this.handleInputChange.bind(this)} className="form-control" type="text" ref="title" value={this.state.item.title}></input><br />
        <label htmlFor="body">Body</label>
        <input id="body" onChange={this.handleInputChange.bind(this)} className="form-control" type="text" ref="body" value={this.state.item.body}></input><br />
        <button onClick={this.editNote.bind(this)} className="btn btn-info" style={{marginRight: '10px'}}>Update Note</button>
      </div>
    )
  }
}

export default NoteDetails
