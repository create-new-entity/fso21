import userServices from '../services/user';
import {
  createNotificationObject,
  createSetNotificationAction,
  createRemoveNotificationAction
} from './notificationReducer';

export const createSetUsersDataAction = () => {
  const failureNotification = createNotificationObject(false, 'Fetching user data failed');

  return async (dispatch) => {
    try {
      const usersData = await userServices.getUserData();
      dispatch({
        type: 'SET_USERS_DATA',
        data: usersData
      });
    }
    catch(err) {
      dispatch(createSetNotificationAction(failureNotification));
      setTimeout(() => {
        dispatch(createRemoveNotificationAction());
      }, 3000);
    }
  };
};

const userDataReducer = (state = [], action) => {
  switch(action.type) {
  case 'SET_USERS_DATA':
    return action.data;
  default:
    return state;
  }
};

export default userDataReducer;