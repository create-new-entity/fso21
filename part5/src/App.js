import React, { useState, useEffect } from 'react';


import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import userServices from './services/user';
import blogServices from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const loginFormSubmitHandler = async (event) => {
    event.preventDefault();

    const userCredentials = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    const newUser = await userServices.login(userCredentials);
    setUser(newUser);

    setUsername('');
    setPassword('');
  };

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    (async () => {
      if(user) {
        const blogs = await blogServices.getAll();
        setBlogs(blogs);
      }
      else return [];
    })();
  }, [user]);

  const blogsContent = () => {
    return (
      <React.Fragment>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )
        }
      </React.Fragment>
    );
  };

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
        loginFormSubmitHandler={loginFormSubmitHandler}
      />
    );
  };

  return (
    <div>
      
      {
        user ? blogsContent(): loginForm()
      }
    </div>
  )
}

export default App