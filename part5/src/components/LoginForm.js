import React from 'react';


const LoginForm = ({ username, password, onUsernameChange, onPasswordChange, loginFormSubmitHandler }) => {
  return (
    <React.Fragment>
    <h2>login to application</h2>
      <form onSubmit={loginFormSubmitHandler}>
        <div>
          username <input name='username' value={username} onChange={onUsernameChange}/>
        </div>
        <div>
          password <input name='password' type='password' value={password} onChange={onPasswordChange}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;