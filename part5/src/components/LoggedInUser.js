import React from 'react';


const LoggedInUser = ( { name, logoutButtonHandler }) => {
  return (
    <React.Fragment>
      <h2>blogs</h2>
      <p> { name } logged in <button onClick={logoutButtonHandler}>logout</button></p>
      <br/>
    </React.Fragment>
  );
};

export default LoggedInUser;