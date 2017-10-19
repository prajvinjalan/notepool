import React, { Component } from 'react'

import Notes from '../containers/Notes'
import NoteDetails from '../containers/NoteDetails'

class NotesLayout extends Component {
  render(){
    return(
      <div className="container">
        <div className="row">
          <Notes></Notes>
        </div>
      </div>
    )
  }
}

export default NotesLayout
