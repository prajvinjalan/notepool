import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../presentation/Home'
import Navbar from './Navbar'
import NoteDetails from '../containers/NoteDetails'
import NotesLayout from './NotesLayout'
import NotFound from '../presentation/NotFound'
import UsersLayout from './UsersLayout'

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
            <Route exact path='/users' component={UsersLayout}/>
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default Main
