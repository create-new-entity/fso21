import React from 'react';
import './../styles/Notification.css';


const Notification = ( { positive, message } ) => {
  return (
    <div id='notification' className={ positive ? 'positive' : 'negative'}>
      { message }
    </div>
  );
};

export default Notification;