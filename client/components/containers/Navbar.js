import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { APIManager, Auth } from '../../utils'
import styles from '../../styles.js'

class Navbar extends Component {
  constructor(props){
    super(props);
  }

  logoutUser(){
    APIManager.get('/auth/logout', null)
    .then(response => {
      console.log(response.message);
      Auth.deauthenticateUser();
      this.props.history.push('/');
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  render(){
    const LogRegLinks = () => {
      return(
        <ul className="nav navbar-nav navbar-right" style={{marginRight: '0'}}>
          <li><Link to="/profile/register">Register</Link></li>
          <li><Link to="/profile/login">Login</Link></li>
        </ul>
      )
    }

    const LogoutLink = () => {
      return(
        <ul className="nav navbar-nav navbar-right" style={{marginRight: '0'}}>
          <li><Link to="/profile" >Profile</Link></li>
          <li><Link to="/" onClick={this.logoutUser.bind(this)}>Logout</Link></li>
        </ul>
      )
    }

    return(
      <div className="container navbar" style={styles.navbar}>
        <ul className="nav navbar-nav">
          <li><Link to="/">Home</Link></li>
          {Auth.isUserAuthenticated() && <li><Link to="/notes">Notes</Link></li>}
        </ul>
        {Auth.isUserAuthenticated() ? <LogoutLink /> : <LogRegLinks />}
      </div>
    )
  }
}

export default withRouter(Navbar)
