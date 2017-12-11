import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Checkbox, Label } from 'semantic-ui-react'

const Note = (props) => {
  // Creates a list of labels for the current note's collaborators
  const collabList = props.currentNote.collaborators.map((collaborator, i) => {
    if (collaborator.type === 'Owner'){
      return(
        <Label key={i} color='teal' image>
          {collaborator.type}
          <Label.Detail content={collaborator.email} />
        </Label>
      )
    }
  })

  // Calls prop function to open 'Edit Note' modal on clicking the note
  const show = () => {
    props.show(props.currentNote);
  }

  const listItems = props.currentNote.listBody.map((item, i) => {
    return(
      <div key={i}>
        <Checkbox className='list-item' checked={item.checked} />
        <span className={'list-item ' + (item.checked ? 'checked' : '')}>{item.text}</span>
      </div>
    )
  })

  return(
    <Card centered onClick={show} className={props.currentNote.colour}>
      <Card.Content>
        <Card.Header content={props.currentNote.title} />
        <Card.Description className='note-card'>
          {props.currentNote.type === 'text' ?
          <span className='note-body'>{props.currentNote.body}</span>
          :
          listItems}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {collabList}
      </Card.Content>
      <Label color='teal' corner='right'>{props.currentNote.collaborators.length}</Label>
    </Card>
  )
}

export default Note
