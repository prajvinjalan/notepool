import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../presentation/Home'
import Navbar from './Navbar'
import NoteDetails from '../containers/NoteDetails'
import NotesLayout from './NotesLayout'
import NotFound from '../presentation/NotFound'
import Profile from '../containers/Profile'

class Main extends Component {
  render(){
    return(
      <div>
        <Navbar></Navbar>
        <main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/notes' component={NotesLayout}/>
            <Route exact path='/notes/:id' component={NoteDetails}/>
            <Route path='/profile' component={Profile}/>
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default Main
