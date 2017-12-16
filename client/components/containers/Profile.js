import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../redux/actions'

import { Loading, LogReg, ProfileDetails, Settings } from '../presentation'
import { PrivateRoute, RouteNotFound } from '../layout/RouteHandler'

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      path: this.props.match.path,
      login: {
        title: 'Login',
        description: 'Login to your account!',
        switchDescription: 'Don\'t have an account?'
      },
      register: {
        title: 'Register',
        description: 'Register for a free account!',
        switchDescription: 'Already have an account?'
      }
    }
  }

  // Registers the user
  registerUser = (user) => {
    this.props.localRegister(user);
  }

  // Logs the user in, then redirects to their notes
  loginUser = (user) => {
    this.props.localLogin(user)
    .then(() => {
      this.props.history.push('/notes');
    });
  }

  googleAuth = () => {
    const url = '/auth/google';
    const name = 'google_login';
    const specs = 'width=500,height=500';
    window.open(url, name, specs);
  }

  facebookAuth = () => {
    const url = '/auth/facebook';
    const name = 'facebook_login';
    const specs = 'width=500,height=500';
    window.open(url, name, specs);
  }

  saveSettings = (passwords) => {
    this.props.changePassword({passwords: passwords, id: this.props.user.id, email: this.props.user.email})
    .then(() => {
      this.props.history.push('/profile/settings');
    });
  }

  render(){
    // Creates the Login page
    const LoginPage = () => {
      return(
        <LogReg title={this.state.login.title} description={this.state.login.description} switchDescription={this.state.login.switchDescription} isRegister={false} buttonClick={this.loginUser} googleAuth={this.googleAuth} facebookAuth={this.facebookAuth} />
      )
    }

    // Creates the Register page
    const RegisterPage = () => {
      return(
        <LogReg title={this.state.register.title} description={this.state.register.description} switchDescription={this.state.register.switchDescription} isRegister={true} buttonClick={this.registerUser} googleAuth={this.googleAuth} facebookAuth={this.facebookAuth} />
      )
    }

    // Creates the Settings page
    const SettingsPage = () => {
      return(
        <Settings saveSettings={this.saveSettings} localAuth={this.props.user.localAuth} />
      )
    }

    // Creates the Details page
    const DetailsPage = () => {
      return(
        <ProfileDetails user={this.props.user} />
      )
    }

    // Returns a Switch Component based on user authentication (to redirect appropriately)
    const AuthSwitch = () => {
      return(
        <div>
          {this.props.user.authenticated ?
            <Switch>
              <Route exact path={this.state.path} component={DetailsPage} />
              <Route exact from={`${this.state.path}/settings`} component={SettingsPage} />
              <Redirect exact from={`${this.state.path}/login`} to={this.state.path} />
              <Redirect exact from={`${this.state.path}/register`} to={this.state.path} />
              <RouteNotFound />
            </Switch>
            :
            <Switch>
              <Route exact path={`${this.state.path}/login`} component={LoginPage} />
              <Route exact path={`${this.state.path}/register`} component={RegisterPage} />
              <PrivateRoute exact path={this.state.path} />
              <PrivateRoute exact path={`${this.state.path}/settings`} component={Settings} />
              <RouteNotFound />
            </Switch>
          }
        </div>
      )
    }

    return(
      <div>
        {this.props.user.loading ? <Loading /> : <AuthSwitch />}
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
  localRegister: (params) => dispatch(actions.localRegister(params)),
  localLogin: (params) => dispatch(actions.localLogin(params)),
  changePassword: (params) => dispatch(actions.changePassword(params))
})

// Connects state and dispatch functions to this component
export default connect(stateToProps, dispatchToProps)(Profile)
