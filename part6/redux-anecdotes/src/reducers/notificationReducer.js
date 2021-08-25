const initialState = null;

//message should be string, positive should be bool
export const createShowNotificationAction = (message, positive, timeLimit) => {
  return async (dispatch) => {

    const setTimeoutId = setTimeout(() => {
      dispatch(createHideNotificationAction());
    }, timeLimit);

    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        message,
        positive,
        setTimeoutId
      }
    });
    
  };
};

export const createHideNotificationAction = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  };
};


const notification = (state = initialState, action) => {
  let newCurrentNotification, newCurrentTimeoutIds, newNotificationState;

  switch(action.type) {

    case 'SHOW_NOTIFICATION':
      newCurrentNotification = {
        message: action.data.message,
        positive: action.data.positive
      };

      newCurrentTimeoutIds = [...state.currentTimeoutIds];
      newCurrentTimeoutIds.push(action.data.setTimeoutId);

      newNotificationState = {
        currentNotification: newCurrentNotification,
        currentTimeoutIds: newCurrentTimeoutIds
      };

      return newNotificationState;


    case 'HIDE_NOTIFICATION':
      newCurrentNotification = state.currentNotification;
      newCurrentTimeoutIds = [...state.currentTimeoutIds];
      newCurrentTimeoutIds.shift();
      if(newCurrentTimeoutIds.length < 1) newCurrentNotification = null;

      newNotificationState = {
        currentNotification: newCurrentNotification,
        currentTimeoutIds: newCurrentTimeoutIds
      };

      return newNotificationState;

      
    default:
      return state;
  }
};


export const notificationStateName = 'notification';
export default notification;