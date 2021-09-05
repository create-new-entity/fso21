import React from 'react';
import { useSelector } from 'react-redux';


const Users = () => {
  const userData = useSelector(state => state.userData);

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