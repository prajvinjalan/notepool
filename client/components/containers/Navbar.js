import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Container, Dropdown, Header, Menu } from 'semantic-ui-react'

import * as actions from '../../redux/actions'
import styles from '../../styles.js'

class Navbar extends Component {
  constructor(props){
    super(props);
  }

  logoutUser(){
    this.props.logout();
  }

  render(){

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

    const UserLinks = () => {
      return(
        <Menu.Menu>
          <Menu.Item name='notes' as={Link} to='/notes'>Notes</Menu.Item>
          <Dropdown item pointing className='top right' text='Profile'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} icon='user' text='Details' to="/profile" />
              <Dropdown.Item icon='setting' text='Settings' />
              <Dropdown.Item as={Link} icon='sign out' text='Logout' onClick={this.logoutUser.bind(this)} to="/" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      )
    }

    return(
      <div style={styles.universal.container}>
        <Container>
          <Menu size='small' secondary>
            <Container>
              <Header size='huge' as={Link} to="/" style={styles.universal.title}>Notepool</Header>
            </Container>
            {this.props.user.authenticated ? <UserLinks /> : <LogRegLinks />}
          </Menu>
        </Container>
      </div>
    )
  }
}

const stateToProps = (state) => ({
  user: state.user
})

const dispatchToProps = (dispatch) => ({
  logout: () => dispatch(actions.logout()),
})

export default connect(stateToProps, dispatchToProps)(withRouter(Navbar))
