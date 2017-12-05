import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'

import store from './redux/store'
import * as actions from './redux/actions'

import Main from './components/layout/Main'
import { CaptureRouteNotFound } from './components/layout/RouteHandler'

import './app.scss'

class AppContainer extends Component {
  constructor(props){
    super(props)
  }

  // When the entire app loads (page reload)
  componentDidMount(){
    // If a user was logged in, uses their previous client id for the socket
    if (this.props.user.authenticated){
      this.props.setClientSocket(this.props.user);
    }
  }

  render(){
    return(
      <Provider store={this.props.store}>
        <div>
          <Router basename="/">
            <CaptureRouteNotFound>
              <Main></Main>
            </CaptureRouteNotFound>
          </Router>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-center"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
        </div>
      </Provider>
    )
  }
}

// Maps state objects to props
const stateToProps = (state) => ({
  user: state.user
})

// Maps dispatch functions to props
const dispatchToProps = (dispatch) => ({
  setClientSocket: (params) => dispatch(actions.setClientSocket(params))
})

// Custom connect method that sets the store for a component
const connectWithStore = (store, WrappedComponent, ...args) => {
  const ConnectedWrappedComponent = connect(...args)(WrappedComponent)
  return (props) => {
    return <ConnectedWrappedComponent {...props} store={store} />
  }
}

// Top-level component that gets rendered
const App = connectWithStore(store.configureStore(), AppContainer, stateToProps, dispatchToProps)

// Renders the component
ReactDOM.render(<App />, document.getElementById('root'))
