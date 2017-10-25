import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { LogReg } from '../presentation'
import { RouteNotFound } from '../layout/RouteHandler'

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      path: this.props.match.path,
      login: {
        title: 'Login',
        description: 'Login to your account!'
      },
      register: {
        title: 'Register',
        description: 'Register for a free account!'
      },
      user: {
        name: "",
        email: "",
        password: ""
      }
    }
  }

  registerUser(newUser){
    console.log(newUser);
  }

  loginUser(){
    console.log(1);
  }

  render(){
    const LoginPage = (props) => {
      return(
        <LogReg title={this.state.login.title} description={this.state.login.description} isRegister={false} buttonClick={this.loginUser.bind(this)} />
      )
    }

    const RegisterPage = (props) => {
      return(
        <LogReg title={this.state.register.title} description={this.state.register.description} isRegister={true} buttonClick={this.registerUser.bind(this)} />
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
