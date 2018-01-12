import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon } from 'semantic-ui-react'
import RealTimeCollaboration1 from '../../assets/RealTimeCollaboration_1.gif'
import RealTimeCollaboration2 from '../../assets/RealTimeCollaboration_2.gif'

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
      <div className='home section' style={{display: 'grid', gridTemplateColumns: '2fr 3fr'}}>
        <div>
          <h1>Real Time Collaboration</h1>
        </div>
        <div>
          <img style={{height: '200px', margin: '3px'}} id='realTimeCollaboration' src={RealTimeCollaboration1}></img>
          <img style={{height: '200px', margin: '3px'}} id='realTimeCollaboration' src={RealTimeCollaboration2}></img>
        </div>
      </div>
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
