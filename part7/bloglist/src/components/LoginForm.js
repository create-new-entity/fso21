import React from 'react';


const LoginForm = ({ username, password, onUsernameChange, onPasswordChange, loginFormSubmitHandler }) => {
  return (
    <React.Fragment>
      <h2>login to application</h2>
      <form id='login' onSubmit={loginFormSubmitHandler}>
        <div>
          username <input id='username' name='username' value={username} onChange={onUsernameChange}/>
        </div>
        <div>
          password <input id='password' name='password' type='password' value={password} onChange={onPasswordChange}/>
        </div>
        <button id='submit' type='submit'>login</button>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;