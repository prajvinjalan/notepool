import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Main from './components/layout/Main'
import { CaptureRouteNotFound } from './components/layout/RouteHandler'

class App extends Component {
  render(){
    return(
      <Router basename="/">
        <CaptureRouteNotFound>
          <Main></Main>
        </CaptureRouteNotFound>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
