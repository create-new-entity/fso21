import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN, GET_LOGGED_IN_USER } from '../queries';


const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    },
    refetchQueries: [
      GET_LOGGED_IN_USER
    ]
  });

  useEffect(() => {
    if(result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('phonebook_graphql_token', token);
    }
  }, [result.data, setToken])

  const loginHandler = (event) => {
    event.preventDefault();

    login({
      variables: {
        username,
        password
      }
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={loginHandler}>
        <div>
          username <input type='text' value={username} onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div>
          password <input type='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </React.Fragment>
  );
};

export default Login;