import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import { createClient } from 'redux-socket.io-connect'
import io from 'socket.io-client'

import reducers from './reducers'

// Sets up thunk and logger middleware
const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

// Sets up socket middleware
const socket = io();
const client = createClient(socket);

export default {
  // Configures store with reducers, initial state, and middleware
  configureStore: (initialState) => {
    const store = createStore(
      reducers,
      initialState,
      compose(
        applyMiddleware(...middleware),
        persistState(null),
        client
      )
    );
    return store;
  }
}
