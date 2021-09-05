import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import userServices from '../services/user';
import {
  createNotificationObject,
  createRemoveNotificationAction,
  createSetNotificationAction
} from '../reducers/notificationReducer';


const Users = () => {
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const user_data = await userServices.getUserData();
        setUserData(user_data);
      }
      catch(err) {
        const notification = createNotificationObject(false, 'Could not fetch user data');
        dispatch(createSetNotificationAction(notification));
        setTimeout(() => {
          dispatch(createRemoveNotificationAction());
        }, 3000);
      }
    })();
  }, []);

  if(!userData.length) return (
    <React.Fragment>
      <h2>No user data found</h2>
    </React.Fragment>
  );

  const remainingRows = () => {
    return userData.map(user => {
      return (
        <tr key={user.id}>
          <td> { user.name } </td>
          <td> { user.blogsCount } </td>
        </tr>
      );
    });
  };

  return (
    <React.Fragment>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td><strong>blogs created</strong></td>
          </tr>
        </thead>
        <tbody>
          { remainingRows() }
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Users;