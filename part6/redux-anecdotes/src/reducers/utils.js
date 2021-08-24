import { anecdoteStateName } from './anecdoteReducer';
import { notificationStateName } from './notificationReducer';
import { filterStateName } from './filterReducer';


const getId = () => (100000 * Math.random()).toFixed(0);

const getInitialState = () => {
  const preloadedState = {};
  preloadedState[anecdoteStateName] = [];
  preloadedState[notificationStateName] = null;
  preloadedState[filterStateName] = '';
  return preloadedState;
};

const getNewContent = (content) => {
  return {
    content,
    id: getId(),
    votes: 0
  };
};

const utils = {
  getInitialState,
  getNewContent
};

export default utils;
