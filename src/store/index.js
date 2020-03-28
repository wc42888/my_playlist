import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') middlewares.push(logger);

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
