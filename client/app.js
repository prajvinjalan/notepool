import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Main from './components/layout/Main'

class App extends Component {
  render(){
    return(
      <Router basename="/">
        <Main></Main>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
