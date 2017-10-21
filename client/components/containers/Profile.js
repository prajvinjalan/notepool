import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import LogReg from '../presentation/LogReg'

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
      }
    }
  }

  render(){
    const LoginPage = (props) => {
      return(
        <LogReg title={this.state.login.title} description={this.state.login.description} displayName={false}></LogReg>
      )
    }

    const RegisterPage = (props) => {
      return(
        <LogReg title={this.state.register.title} description={this.state.register.description} displayName={true}></LogReg>
      )
    }

    return(
      <div>
        <Route exact path={`${this.state.path}/login`} component={LoginPage}/>
        <Route exact path={`${this.state.path}/register`} component={RegisterPage}/>
      </div>
    )
  }
}

export default Profile
