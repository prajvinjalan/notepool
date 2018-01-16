import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon } from 'semantic-ui-react'
import CustomizeNotes from '../../assets/CustomizeNotes.gif'
import Devices from '../../assets/Devices.png'
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
        <div className='text'>
          <Header size='huge'>
            Customize your notes
            <Header.Subheader>
              Create simple text or list notes and customize them to keep track of the notes you share
            </Header.Subheader>
          </Header>
        </div>
        <div>
          <img id='customizeNotesGif' src={CustomizeNotes}></img>
        </div>
      </div>
      <div className='home section image'>
        <div className='double'>
          <img id='realTimeCollaborationGif1' src={RealTimeCollaboration1}></img>
          <img id='realTimeCollaborationGif2' src={RealTimeCollaboration2}></img>
        </div>
        <div className='text'>
          <Header size='huge'>
            Collaborate in real time
            <Header.Subheader>
              Invite others to collaborate on your notes as editors or viewers, and watch as updates occur in real time
            </Header.Subheader>
          </Header>
        </div>
      </div>
      <div className='home section image'>
        <div className='text'>
          <Header size='huge'>
            Find everything you need
            <Header.Subheader>
              Easily search for notes by their content or collaborators, and add filters for attributes like colour and note type
            </Header.Subheader>
          </Header>
        </div>
        <div>
          <img id='searchNotesGif' src={SearchNotes}></img>
        </div>
      </div>
      <div className='home section image'>
        <div>
          <img id='devicesImage' src={Devices}></img>
        </div>
        <div className='text'>
          <Header size='huge'>
            Accessible on all devices
            <Header.Subheader>
              All your changes are saved to your account so your notes can be accessed anytime, anywhere
            </Header.Subheader>
          </Header>
        </div>
      </div>
      <div className='home section'>
        <Header size='huge'>
          Try Notepool for free today!
        </Header>
        <Button color='teal' size='huge' as={Link} to='/profile/register'>Register</Button>
      </div>
    </div>
  )
}

export default Home
