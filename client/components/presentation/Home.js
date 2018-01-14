import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon } from 'semantic-ui-react'
import CustomizeNotes from '../../assets/CustomizeNotes.gif'
import RealTimeCollaboration1 from '../../assets/RealTimeCollaboration_1.gif'
import RealTimeCollaboration2 from '../../assets/RealTimeCollaboration_2.gif'
import SearchNotes from '../../assets/SearchNotes.gif'

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
      <div className='home section image'>
        <div>
          <h1>Customize your notes</h1>
        </div>
        <div>
          <img id='customizeNotes' src={CustomizeNotes}></img>
        </div>
      </div>
      <div className='home section image'>
        <div className='left'>
          <img id='realTimeCollaboration' src={RealTimeCollaboration1}></img>
          <img id='realTimeCollaboration' src={RealTimeCollaboration2}></img>
        </div>
        <div>
          <h1>Collaborate in real time</h1>
        </div>
      </div>
      <div className='home section image'>
        <div>
          <h1>Find everything you need</h1>
        </div>
        <div>
          <img id='searchNotes' src={SearchNotes}></img>
        </div>
      </div>
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
