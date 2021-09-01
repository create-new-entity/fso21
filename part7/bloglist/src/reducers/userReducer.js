import userServices from '../services/user';
import {
  createNotificationObject,
  createSetNotificationAction,
  createRemoveNotificationAction
} from './notificationReducer';


export const createSetUserToNull = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_USER_TO_NULL'
    });
  };
};

export const createSetExistingUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_EXISTING_USER_IF_ANY'
    });
  };
};

export const createSetNewUser = (userCredentials) => {
  const successNotification = createNotificationObject(true, `${userCredentials.username} logged in.`);
  const failureNotification = createNotificationObject(false, 'Login failed');

  return async (dispatch) => {
    try {
      const newUser = await userServices.login(userCredentials);
      dispatch({
        type: 'SET_LOGGED_IN_USER',
        data: newUser
      });
      dispatch(createSetNotificationAction(successNotification));
      setTimeout(() => {
        dispatch(createRemoveNotificationAction());
      }, 3000);
    }
    catch(err) {
      dispatch(createSetNotificationAction(failureNotification));
      setTimeout(() => {
        dispatch(createRemoveNotificationAction());
      }, 3000);
    }
  };
};

const userReducer = (state = null, action) => {
  let existingUser;

  switch(action.type) {
  case 'SET_LOGGED_IN_USER':
    window.localStorage.setItem('user', JSON.stringify(action.data));
    return action.data;
  case 'SET_USER_TO_NULL':
    window.localStorage.removeItem('user');
    return null;
  case 'SET_EXISTING_USER_IF_ANY':
    existingUser = window.localStorage.getItem('user');
    if (existingUser) return JSON.parse(existingUser);
    return null;
  default:
    return state;
  }
};

export default userReducer;
