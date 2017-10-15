import React, { Component } from 'react'

import Note from '../presentation/Note'

class Notes extends Component {
  constructor(){
    super()

    this.state = {
      list: [
        {title: "Note Uno", body: "this is the first one", author: "Prajvin"},
        {title: "Note Dos", body: "this be the silver medal", author: "Andre Degrasse"},
        {title: "Note Tres", body: "this is the 3rd 1", author: "Pdawg"}
      ]
    }
  }
  render(){

    const listItems = this.state.list.map((note, i) => {
      return(
        <li key={i}><Note currentNote={note}></Note></li>
      )
    })

    return(
      <div>
        <ol>
          {listItems}
        </ol>
      </div>
    )
  }
}

export default Notes
