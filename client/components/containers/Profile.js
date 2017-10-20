import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Login from '../presentation/Login'
import Signup from '../presentation/Signup'

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      path: this.props.match.path
    }
  }

  render(){
    return(
      <div>
        <Route exact path={`${this.state.path}/signup`} component={Signup}/>
        <Route exact path={`${this.state.path}/login`} component={Login}/>
      </div>
    )
  }
}

export default Profile
