import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

import store from './redux/store'
import * as actions from './redux/actions'

import Main from './components/layout/Main'
import { CaptureRouteNotFound } from './components/layout/RouteHandler'

import './app.scss'

class AppContainer extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    if (this.props.user.authenticated){
      this.props.setClientSocket(this.props.user);
    }
  }

  render(){
    return(
      <Provider store={this.props.store}>
        <Router basename="/">
          <CaptureRouteNotFound>
            <Main></Main>
          </CaptureRouteNotFound>
        </Router>
      </Provider>
    )
  }
}

const stateToProps = (state) => ({
  user: state.user
})

const dispatchToProps = (dispatch) => ({
  setClientSocket: (params) => dispatch(actions.setClientSocket(params))
})

const connectWithStore = (store, WrappedComponent, ...args) => {
  const ConnectedWrappedComponent = connect(...args)(WrappedComponent)
  return (props) => {
    return <ConnectedWrappedComponent {...props} store={store} />
  }
}

const App = connectWithStore(store.configureStore(), AppContainer, stateToProps, dispatchToProps)

ReactDOM.render(<App />, document.getElementById('root'))
