import React from 'react'
import { Container, Divider, Grid, Icon } from 'semantic-ui-react'

// Component for user's profile details
const ProfileDetails = (props) => {

  return(
    <Grid container stackable columns='equal' textAlign='center' className='profile-details container'>
      <Grid.Column width={3}>
        <Icon name='user circle outline' size='huge' />
      </Grid.Column>
      <Grid.Column width={1}>
        <Divider vertical section />
      </Grid.Column>
      <Grid.Column>
        <Container content='Profile Details' />
      </Grid.Column>
    </Grid>
  )
}

export default ProfileDetails
