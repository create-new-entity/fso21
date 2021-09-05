import userServices from '../services/user';
import {
  createNotificationObject,
  createSetNotificationAction,
  createRemoveNotificationAction
} from './notificationReducer';


export const createSetUserDataAction = (id) => {
  const failureNotification = createNotificationObject(false, 'Fetching user data failed');


  return async (dispatch) => {
    try {
      const userData = await userServices.getUserData(id);
      dispatch({
        type: 'SET_USER_DATA',
        data: userData
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



const userDataReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER_DATA':
    return action.data;
  default:
    return state;
  }
};

export default userDataReducer;