export const NOTIFICATION_TIMEOUT = 3000;

export const createNotificationObject = (positive, message) => {
  return {
    positive,
    message
  };
};

export const createSetNotificationAction = (notification) => {
  return async (dispatch) => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: notification
    });
  };
};

export const createRemoveNotificationAction = () => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION'
    });
  };
};

const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'CREATE_NOTIFICATION':
    return action.data;
  case 'REMOVE_NOTIFICATION':
    return null;
  default:
    return state;
  }
};

export default notificationReducer;