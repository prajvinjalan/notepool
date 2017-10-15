import  React, { Component } from 'react'

import Note from './Note'
import styles from './styles.js'

class ListNote extends Component {
  render(){
    const noteStyle = styles.note

    return(
      <div style={noteStyle.container}>
        <Note currentNote={this.props.currentNote}></Note>
        <div>
          <ul style={noteStyle.list}>
            {this.props.currentListItems}
          </ul>
        </div>
      </div>
    )
  }
}

export default ListNote
