import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import utils from './reducers/utils';

const preloadedState = utils.getInitialState();

const reducers = {
  anecdoteReducer,
  notificationReducer
};

const combinedReducer = combineReducers(reducers);
const store = createStore(combinedReducer, preloadedState, composeWithDevTools());

export default store;