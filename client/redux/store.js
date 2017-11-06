import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default {
  configureStore: () => {
    const store = createStore(
      reducers,
      applyMiddleware(...middleware)
    );
    return store;
  },

  currentStore: () => {
    return store;
  }
}
