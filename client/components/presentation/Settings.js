import React, { Component } from 'react'
import { Button, Container, Header, Icon, Input } from 'semantic-ui-react'

// Component for user's settings (currently just to change password)
class Settings extends Component {
  constructor(props){
    super(props);

    this.state = {
      oldPass: '',
      newPass: '',
      newPassConfirm: ''
    }
  }

  // Handles changes to inputs on this page
  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // Calls the 'saveSettings' button prop
  saveSettings = () => {
    this.props.saveSettings({...this.state});
  }

  render(){
    const passChangeForm =
      <Container className='settings container'>
        <Header size='huge' className='settings inner header'>Change Password</Header>
        <Input fluid id="oldPass" icon='lock' iconPosition='left' placeholder='Old Password' type='password' onChange={this.handleInputChange} className='settings input' />
        <Input fluid id="newPass" icon='lock' iconPosition='left' placeholder='New Password' type='password' onChange={this.handleInputChange}
          className={'settings input ' +
          (this.state.newPassConfirm === '' ? '' : (this.state.newPass === this.state.newPassConfirm ? 'success' : 'error'))
          }
        />
        <Input fluid id="newPassConfirm" icon='lock' iconPosition='left' placeholder='Re-type New Password' type='password' onChange={this.handleInputChange}
          className={'settings input ' +
          (this.state.newPassConfirm === '' ? '' : (this.state.newPass === this.state.newPassConfirm ? 'success' : 'error'))
          }
        />
        <Button id='saveSettings' size='medium' fluid color='green' onClick={this.saveSettings} className={
          ((this.state.oldPass !== '') && (this.state.newPass !== '') && (this.state.newPassConfirm !== '') && (this.state.newPass === this.state.newPassConfirm)) ? '' : 'disabled'
        }>Save</Button>
      </Container>

    const comingSoon =
      <Container className='settings container'>
        <Header size='large' icon>
          <Icon name='clock' />
          Coming Soon
          <Header.Subheader>
            Settings for Google/Facebook users....
          </Header.Subheader>
        </Header>
      </Container>

    return(
      <div>
        <Header size='huge' className='settings'>Settings</Header>
        {this.props.localAuth && passChangeForm}
        {!this.props.localAuth && comingSoon}
      </div>
    )
  }
}

export default Settings
