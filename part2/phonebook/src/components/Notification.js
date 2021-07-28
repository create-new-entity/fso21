import React from 'react';

import './../styles/Notification.css';


const Notification = ( { positive, message }) => {
  let notificationStyleClass = '';

  positive ? notificationStyleClass = 'positive' : notificationStyleClass = 'negative';

  return (
    <div className={notificationStyleClass}>
      {
        message
      }
    </div>
  );
};

export default Notification;