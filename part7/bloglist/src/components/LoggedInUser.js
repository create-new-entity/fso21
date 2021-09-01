import React from 'react';


const LoggedInUser = ( { name, logoutButtonHandler }) => {
  return (
    <React.Fragment>
      <h2>blogs</h2>
      <p id='logged_in_user'> { name } logged in <button id='logout' onClick={logoutButtonHandler}>logout</button></p>
      <br/>
    </React.Fragment>
  );
};

export default LoggedInUser;