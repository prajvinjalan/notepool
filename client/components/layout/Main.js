import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'
import { Home } from '../presentation'
import Navbar from './Navbar'
import NoteDetails from '../containers/NoteDetails'
import Notes from '../containers/Notes'
import Profile from '../containers/Profile'
import { RouteNotFound } from './RouteHandler'

class Main extends Component {
  render(){
    return(
      <div>
        <Header />
        <Navbar />
        <main style={{minHeight: '435px'}}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/notes' component={Notes}/>
            <Route exact path='/notes/:id' component={NoteDetails}/>
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
