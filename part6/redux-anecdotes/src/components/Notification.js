import React from 'react';
import { connect } from 'react-redux';


const Notification = (props) => {
  const notification = props.notification;
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(!notification) return null;
  return (
    <div style={style}>
      {
        notification.message
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  let notification;

  if(!state.notification) notification = null;
  else {
    notification = {
      message: state.notification.message,
      positive: state.notification.positive
    };
  };

  return {
    notification
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;