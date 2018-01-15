import React from 'react'
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'

// Component for user's profile details
const ProfileDetails = (props) => {
  return(
    <Container>
      <Header size='huge' className='details'>Details</Header>
      <Grid container stackable columns='equal' textAlign='center' className='details container' verticalAlign='middle'>
        <Grid.Column width={4}>
          <Icon name='user circle outline' size='huge' />
          <Header size='small' className='name'>{props.user.name}</Header>
        </Grid.Column>
        <Grid.Column width={1} only='computer tablet'>
          <div className='details divider'></div>
        </Grid.Column>
        <Grid.Column>
          <Header size='large' icon>
            <Icon name='clock' />
            Coming Soon
            <Header.Subheader>
              User bio, note statistics, and other details....
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default ProfileDetails
