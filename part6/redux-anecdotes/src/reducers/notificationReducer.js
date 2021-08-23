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

const notificationReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      newState = { ...state };
      newState.notification = action.data;
      return newState;
    case 'HIDE_NOTIFICATION':
      newState = { ...state };
      newState.notification = null;
      return newState;
    default:
      return state;
  }
};


export const notificationStateName = 'notification';
export default notificationReducer;