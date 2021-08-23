import notificationReducer from './notificationReducer';
import { notificationStateName } from './notificationReducer';
import deepFreeze from 'deep-freeze';
import utils from './utils';

describe(`State tests (${notificationStateName})`, () => {
  let initialState;

  beforeEach(() => {
    initialState = utils.getInitialState();
  });

  test('Setting notification in state works', () => {
    const action = {
      type: 'SHOW_NOTIFICATION', 
      data: {
        message: 'New note created',
        positive: true
      }
    };

    deepFreeze(initialState);
    const newState = notificationReducer(initialState, action);
    expect(newState.notification).toBeDefined();
    expect(newState.notification).toEqual(action.data);
  });

  test('Hiding notification in state works', () => {
    const action = {
      type: 'HIDE_NOTIFICATION'
    };

    deepFreeze(initialState);
    const newState = notificationReducer(initialState, action);
    expect(newState.notification).toBeNull();
  }); 
});