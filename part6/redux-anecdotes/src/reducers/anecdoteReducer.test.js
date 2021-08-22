import anecdoteReducer from './anecdoteReducer';
import deepFreeze from 'deep-freeze';
import utils from './utils';

describe('anecdote tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = utils.getInitialState();
  });

  test('vote action works', () => {
    const firstAnecdote = initialState[0];
    const action = {
      type: 'VOTE', 
      data: {
        id: firstAnecdote.id
      }
    };

    deepFreeze(initialState);
    const newState = anecdoteReducer(initialState, action);
    expect(newState[0].id).toBe(initialState[0].id);
    expect(newState[0].votes).toBe(initialState[0].votes + 1);
  });
});