import React, { Component } from 'react'

import Note from '../presentation/Note'
import ListNote from '../presentation/ListNote'

class NoteDetails extends Component {
  constructor(){
    super()

    this.state = {
      item: {
        title: "Note Uno",
        body: "this is the first one",
        listBody: [
          "first",
          "second",
          "third"
        ],
        author: "Prajvin"
      },
      updatedItem: {
        title: "",
        body: "",
        listBody: [],
        author: ""
      }
    }
  }

  updateTitle(event){
    let updatedInfo = Object.assign({}, this.state.updatedItem)
    updatedInfo['title'] = event.target.value
    this.setState({
      updatedItem: updatedInfo
    })
  }

  updateBody(event){
    let updatedInfo = Object.assign({}, this.state.updatedItem)
    updatedInfo['body'] = event.target.value
    this.setState({
      updatedItem: updatedInfo
    })
  }

  updateAuthor(event){
    let updatedInfo = Object.assign({}, this.state.updatedItem)
    updatedInfo['author'] = event.target.value
    this.setState({
      updatedItem: updatedInfo
    })
  }

  submitInfo(){
    let updatedInfo = Object.assign({}, this.state.updatedItem)
    updatedInfo['listBody'] = this.state.item.listBody
    this.setState({
      item: updatedInfo
    })
  }

  submitBody(){
    let updatedListBody = Object.assign([], this.state.item.listBody)
    updatedListBody.push(this.state.updatedItem.body)
    let updatedInfo = Object.assign({}, this.state.item)
    updatedInfo['listBody'] = updatedListBody
    this.setState({
      item: updatedInfo
    })
  }

  render(){
    const listBodyItems = this.state.item.listBody.map((listItem, i) => {
      return(
        <li key={i}>{listItem}</li>
      )
    })
    return(
      <div>
        <ListNote currentNote={this.state.item} currentListItems={listBodyItems}></ListNote><br />
        <input onChange={this.updateTitle.bind(this)} className="form-control" type="text" placeholder="Title"></input><br />
        <input onChange={this.updateBody.bind(this)} className="form-control" type="text" placeholder="Body"></input><br />
        <input onChange={this.updateAuthor.bind(this)} className="form-control" type="text" placeholder="Author"></input><br />
        <button onClick={this.submitInfo.bind(this)} className="btn btn-info" style={{marginRight: '10px'}}>Update Information</button>
        <button onClick={this.submitBody.bind(this)} className="btn btn-info">Add line to body</button>
      </div>
    )
  }
}

export default NoteDetails
