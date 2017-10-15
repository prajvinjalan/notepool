import React, { Component } from 'react'

import Notes from '../containers/Notes'
import NoteDetails from '../containers/NoteDetails'

class Home extends Component {
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Notes></Notes>
          </div>
          <div className="col-md-8">
            <NoteDetails></NoteDetails>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
