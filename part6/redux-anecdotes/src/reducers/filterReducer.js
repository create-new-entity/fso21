const initialState = '';

export const createFilterChangedAction = (content) => {
  return {
    type: 'FILTER_CHANGED',
    data: content
  };
};

const filter = (state = initialState, action) => {
  switch(action.type) {
    case 'FILTER_CHANGED':
      return action.data;
    default:
      return state;
  };
};

export const filterStateName = 'filter';
export default filter;