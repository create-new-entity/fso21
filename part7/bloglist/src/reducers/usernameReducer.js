

export const createSetUsernameAction = (newUsername) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEW_USERNAME',
      data: newUsername
    });
  };
};


const usernameReducer = (state = '', action) => {
  switch(action.type) {
  case 'NEW_USERNAME':
    return action.data;
  default:
    return state;
  }
};

export default usernameReducer;