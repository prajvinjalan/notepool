import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import Main from './components/layout/Main'
import { CaptureRouteNotFound } from './components/layout/RouteHandler'

class App extends Component {
  render(){
    return(
      <Provider store={store.configureStore()}>
        <Router basename="/">
          <CaptureRouteNotFound>
            <Main></Main>
          </CaptureRouteNotFound>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
