import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../redux/actions'

import { Loading, LogReg, ProfileDetails } from '../presentation'
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

  registerUser = (user) => {
    this.props.localRegister(user);
  }

  loginUser = (user) => {
    this.props.localLogin(user)
    .then(() => {
      this.props.history.push('/notes');
    });
  }

  render(){
    const LoginPage = () => {
      return(
        <LogReg title={this.state.login.title} description={this.state.login.description} switchDescription={this.state.login.switchDescription} isRegister={false} buttonClick={this.loginUser} />
      )
    }

    const RegisterPage = () => {
      return(
        <LogReg title={this.state.register.title} description={this.state.register.description} switchDescription={this.state.register.switchDescription} isRegister={true} buttonClick={this.registerUser} />
      )
    }

    const AuthSwitch = () => {
      return(
        <div>
          {this.props.user.authenticated ?
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
              <PrivateRoute exact path={this.state.path} />
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

const stateToProps = (state) => ({
  user: state.user
})

const dispatchToProps = (dispatch) => ({
  localRegister: (params) => dispatch(actions.localRegister(params)),
  localLogin: (params) => dispatch(actions.localLogin(params))
})

export default connect(stateToProps, dispatchToProps)(Profile)
