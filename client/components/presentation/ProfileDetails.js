import React from 'react'
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'

// Component for user's profile details
const ProfileDetails = (props) => {

  console.log(props.user);
  return(
    <Container>
      <Header size='huge' className='details'>Details</Header>
      <Grid container stackable columns='equal' textAlign='center' className='details container'>
        <Grid.Column width={3} verticalAlign='middle'>
          <Icon name='user circle outline' size='huge' />
        </Grid.Column>
        <Grid.Column width={1}>
          <div className='details divider'></div>
        </Grid.Column>
        <Grid.Column>
          <Container content='Profile Details' />
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default ProfileDetails
