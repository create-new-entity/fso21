import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';


const Users = () => {
  const usersData = useSelector(state => state.usersData);
  const location = useLocation();

  if(!usersData.length) return (
    <React.Fragment>
      <h2>No user data found</h2>
    </React.Fragment>
  );

  const remainingRows = () => {
    return usersData.map(user => {
      return (
        <tr key={user.id}>
          <td>
            <Link to={`${location.pathname}/${user.id}`}>
              { user.name }
            </Link>
          </td>
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