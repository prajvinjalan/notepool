import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon } from 'semantic-ui-react'

// Component for home page
const Home = (props) => {

  return(
    <div className='home container'>
      <div className='home section'>
        <Header size='huge' icon>
          <Icon name='book' />
          Notepool
          <Header.Subheader>
            The ultimate note collaboration app.
          </Header.Subheader>
        </Header>
      </div>
      <div className='home section'>Second Box</div>
      <div className='home section'>Third Box</div>
      <div className='home section'>Fourth Box</div>
      <div className='home section'>
        <Header size='small'>
          Try Notepool for free today!
        </Header>
        <Button inverted color='green' size='huge' as={Link} to='/profile/register'>Register</Button>
      </div>
    </div>
  )
}

export default Home
