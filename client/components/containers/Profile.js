import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { APIManager } from '../../utils'
import { LogReg } from '../presentation'
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
    console.log(newUser);
    APIManager.post('/auth/register', newUser, (error, response) => {
      if(error){
        console.log(error.message);
        return;
      }
      console.log(response.message);
    });
  }

  loginUser(user){
    APIManager.post('/auth/login', user, (error, response) => {
      if(error){
        console.log(error.message);
        return;
      }
      console.log(response.message);
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
      <Switch>
        <Route exact path={`${this.state.path}/login`} component={LoginPage}/>
        <Route exact path={`${this.state.path}/register`} component={RegisterPage}/>
        <RouteNotFound />
      </Switch>
    )
  }
}

export default Profile
