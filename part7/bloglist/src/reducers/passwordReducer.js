

export const createSetPasswordAction = (newPassword) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEW_PASSWORD',
      data: newPassword
    });
  };
};


const passwordReducer = (state = '', action) => {
  switch(action.type) {
  case 'NEW_PASSWORD':
    return action.data;
  default:
    return state;
  }
};

export default passwordReducer;