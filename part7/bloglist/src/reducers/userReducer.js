import userServices from '../services/user';


export const createSetUserToNull = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_USER_TO_NULL'
    });
  };
};

export const createSetNewUser = (userCredentials) => {
  return async (dispatch) => {
    const newUser = await userServices.login(userCredentials);
    dispatch({
      type: 'SET_LOGGED_IN_USER',
      data: newUser
    });
  };
};

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_LOGGED_IN_USER':
    window.localStorage.setItem('user', JSON.stringify(action.data));
    return action.data;
  case 'SET_USER_TO_NULL':
    window.localStorage.removeItem('user');
    return null;
  default:
    return state;
  }
};

export default userReducer;
