import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Container, Dropdown, Header, Icon, Menu } from 'semantic-ui-react'

import * as actions from '../../redux/actions'

class Navbar extends Component {
  constructor(props){
    super(props);
  }

  // Logs user out, then redirects to home page
  logoutUser = () => {
    this.props.logout()
    .then(() => {
      this.props.history.push('/');
    });
  }

  render(){

    // Creates Login and Register links
    const LogRegLinks = () => {
      return(
        <Menu.Menu>
          <Menu.Item name='register'>
            <Button inverted color='green' as={Link} to='/profile/register'>Register</Button>
          </Menu.Item>
          <Menu.Item name='login'>
            <Button inverted color='green' as={Link} to='/profile/login'>Login</Button>
          </Menu.Item>
        </Menu.Menu>
      )
    }

    // Creates Notes and Profile menu links
    const UserLinks = () => {
      return(
        <Menu.Menu>
          <Menu.Item name='notes' as={Link} to='/notes'>Notes</Menu.Item>
          <Dropdown item pointing className='top right' trigger={<Icon name='user circle' size='big'/>}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} icon='user' text='Details' to="/profile" />
              <Dropdown.Item icon='setting' text='Settings' />
              <Dropdown.Item as={Link} icon='sign out' text='Logout' onClick={this.logoutUser} to="/" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      )
    }

    return(
      <div className='navbar'>
        <Container>
          <Menu size='small' secondary>
            <Container>
              <Header size='huge' as={Link} to="/" content='Notepool' />
            </Container>
            {this.props.user.authenticated ? <UserLinks /> : <LogRegLinks />}
          </Menu>
        </Container>
      </div>
    )
  }
}

// Maps state objects to props
const stateToProps = (state) => ({
  user: state.user
})

// Maps dispatch functions to props
const dispatchToProps = (dispatch) => ({
  logout: () => dispatch(actions.logout()),
})

// Connects state and dispatch functions to this component
export default connect(stateToProps, dispatchToProps)(withRouter(Navbar))
