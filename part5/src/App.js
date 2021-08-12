import React, { useState, useEffect } from 'react';


import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import CreateNewBlogForm from './components/CreateNewBlogForm';
import LoggedInUser from './components/LoggedInUser';
import userServices from './services/user';
import blogServices from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');


  const createNewBlogSubmitHandler = async (event) => {
    let newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    };

    await blogServices.createNew(newBlog, user.token);
  };

  const logoutButtonHandler = () => {
    setUser(null);
    window.localStorage.removeItem('user');
  };

  const loginFormSubmitHandler = async (event) => {
    event.preventDefault();

    const userCredentials = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    const newUser = await userServices.login(userCredentials);
    window.localStorage.setItem('user', JSON.stringify(newUser));
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

  useEffect(() => {
    const existingUser = window.localStorage.getItem('user');
    if(existingUser) setUser(JSON.parse(existingUser));
  }, []);

  const inputChangeHandler = (setFn) => {
    return (event) => {
      setFn(event.target.value);
    };
  };

  const createNewFormContent = () => {
    return (
      <React.Fragment>
        <CreateNewBlogForm
          title={title}
          author={author}
          url={url}
          titleChangeHandler={inputChangeHandler(setTitle)}
          authorChangeHandler={inputChangeHandler(setAuthor)}
          urlChangeHandler={inputChangeHandler(setUrl)}
          createNewBlogSubmitHandler={createNewBlogSubmitHandler}
        />
      </React.Fragment>
    );
  };

  const blogsContent = () => {
    return (
      <React.Fragment>
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )
        }
      </React.Fragment>
    );
  };


  const contentIfLoggedIn = () => {
    return (
      <React.Fragment>
        <LoggedInUser
          name={user.name}
          logoutButtonHandler={logoutButtonHandler}
        />
        {
          createNewFormContent()
        }
        {
          blogsContent()
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
        user ? contentIfLoggedIn(): loginForm()
      }
    </div>
  )
}

export default App