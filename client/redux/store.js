import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import { createClient } from 'redux-socket.io-connect'
import io from 'socket.io-client'

import reducers from './reducers'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const socket = io();
const client = createClient(socket);

export default {
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
