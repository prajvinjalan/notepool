import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Label } from 'semantic-ui-react'

const Note = (props) => {
  // Creates a list of labels for the current note's collaborators
  const collabList = props.currentNote.collaborators.map((collaborator, i) => {
    return(
      <Label key={i}>{collaborator}</Label>
    )
  })

  // Calls prop function to open 'Edit Note' modal on clicking the note
  const show = () => {
    props.show(props.currentNote);
  }

  return(
    <Card centered onClick={show} className={props.currentNote.colour}>
      <Card.Content>
        <Card.Header content={props.currentNote.title} />
        <Card.Description>
          <span className='note-body'>{props.currentNote.body}</span>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {collabList}
      </Card.Content>
    </Card>
  )
}

export default Note
