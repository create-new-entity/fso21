const initialState = null;

//message should be string, positive should be bool
export const createShowNotificationAction = (message, positive) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: {
      message,
      positive
    }
  };
};

export const createHideNotificationAction = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  };
};

const notification = (state = initialState, action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data;
    case 'HIDE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};


export const notificationStateName = 'notification';
export default notification;