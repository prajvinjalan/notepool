import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { APIManager, Auth } from '../../utils'
import { LogReg, ProfileDetails } from '../presentation'
import { RouteNotFound } from '../layout/RouteHandler'

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
      },
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  }

  registerUser(newUser){
    APIManager.post('/auth/register', newUser)
    .then(response => {
      console.log(response.message);
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  loginUser(user){
    APIManager.post('/auth/login', user)
    .then(response => {
      console.log(response.message);
      Auth.authenticateUser(response.user._id);
      this.props.history.push('/notes');
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  render(){
    const LoginPage = (props) => {
      return(
        <LogReg title={this.state.login.title} description={this.state.login.description} switchDescription={this.state.login.switchDescription} isRegister={false} buttonClick={this.loginUser.bind(this)} />
      )
    }

    const RegisterPage = (props) => {
      return(
        <LogReg title={this.state.register.title} description={this.state.register.description} switchDescription={this.state.register.switchDescription} isRegister={true} buttonClick={this.registerUser.bind(this)} />
      )
    }

    return(
      <div>
        {Auth.isUserAuthenticated() ?
          <Switch>
            <Route exact path={this.state.path} component={ProfileDetails}/>
            <Redirect exact from={`${this.state.path}/login`} to={this.state.path} />
            <Redirect exact from={`${this.state.path}/register`} to={this.state.path} />
            <RouteNotFound />
          </Switch>
          :
          <Switch>
            <Route exact path={`${this.state.path}/login`} component={LoginPage}/>
            <Route exact path={`${this.state.path}/register`} component={RegisterPage}/>
            <Redirect exact from={this.state.path} to={`${this.state.path}/login`} />
            <RouteNotFound />
          </Switch>
        }
      </div>
    )
  }
}

export default Profile
