import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Footer from './Footer'
import { AuthSuccess, Home } from '../presentation'
import Navbar from '../containers/Navbar'
import Notes from '../containers/Notes'
import Profile from '../containers/Profile'
import Redirecting from '../containers/Redirecting'
import { PrivateRoute, RouteNotFound } from './RouteHandler'

// Main application layout with base routes
const Main = () => (
  <div>
    <Navbar />
    <main className='main-container'>
      <Switch>
        <PrivateRoute exact path='/' component={Home}/>
        <PrivateRoute exact path='/notes' component={Notes}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/auth_success' component={AuthSuccess} />
        <Route path='/redirect' component={Redirecting} />
        <RouteNotFound />
      </Switch>
    </main>
    <Footer />
  </div>
)

export default Main
