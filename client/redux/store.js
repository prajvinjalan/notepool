import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'

import reducers from './reducers'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default {
  configureStore: (initialState) => {
    const store = createStore(
      reducers,
      initialState,
      compose(
        applyMiddleware(...middleware),
        persistState(null)
      )
    );
    return store;
  },

  currentStore: () => {
    return store;
  }
}
