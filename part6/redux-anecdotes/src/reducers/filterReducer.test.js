import filter from './filterReducer';
import { filterStateName } from './filterReducer';
import utils from './utils';

describe(`State tests ${filterStateName}`, () => {
  let initialState;

  beforeEach(() => {
    initialState = utils.getInitialState();
  });

  test('Filter reducer returns correct data', () => {
    const action = {
      type: 'FILTER_CHANGED',
      data: 'test'
    };

    const newState = filter(initialState[filterStateName], action);
    expect(newState).toBe(action.data);
  });

  test('Filter reducer return default when invalid type given', () => {
    const action = {
      type: 'INVALID_ACTION',
      data: 'bunch of nonsense'
    };

    const newState = filter(initialState[filterStateName], action);
    expect(newState).not.toBe(action.data);
    expect(newState).toBe(initialState[filterStateName]);
  });
});