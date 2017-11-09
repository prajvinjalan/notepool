import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

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
          {this.props.user.authenticated && <li><Link to="/notes">Notes</Link></li>}
        </ul>
        {this.props.user.authenticated ? <LogoutLink /> : <LogRegLinks />}
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
