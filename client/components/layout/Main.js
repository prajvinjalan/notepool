import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Footer from './Footer'
import { Home } from '../presentation'
import Navbar from '../containers/Navbar'
import Notes from '../containers/Notes'
import Profile from '../containers/Profile'
import { PrivateRoute, RouteNotFound } from './RouteHandler'

class Main extends Component {
  render(){
    return(
      <div>
        <Navbar />
        <main style={{minHeight: '435px'}}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <PrivateRoute exact path='/notes' component={Notes}/>
            <Route path='/profile' component={Profile}/>
            <RouteNotFound />
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }
}

export default Main
