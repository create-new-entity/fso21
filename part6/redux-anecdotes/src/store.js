import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import anecdotes from './reducers/anecdoteReducer';
import notification from './reducers/notificationReducer';
import filter from './reducers/filterReducer';
import utils from './reducers/utils';

const preloadedState = utils.getInitialState();

const reducers = {
  anecdotes,
  notification,
  filter
};

const combinedReducer = combineReducers(reducers);
const store = createStore(combinedReducer, preloadedState, composeWithDevTools());


export default store;