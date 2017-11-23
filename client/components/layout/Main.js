import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Footer from './Footer'
import { Home } from '../presentation'
import Navbar from '../containers/Navbar'
import Notes from '../containers/Notes'
import Profile from '../containers/Profile'
import { PrivateRoute, RouteNotFound } from './RouteHandler'

// Main application layout with base routes
const Main = () => (
  <div>
    <Navbar />
    <main style={{minHeight: '38rem'}}>
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

export default Main
