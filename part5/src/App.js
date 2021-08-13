import React, { useState, useEffect, useRef } from 'react';


import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import CreateNewBlogForm from './components/CreateNewBlogForm';
import LoggedInUser from './components/LoggedInUser';
import userServices from './services/user';
import blogServices from './services/blogs';

const NOTIFICATION_TIMEOUT = 3000;

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notification, setNotification] = useState(null);

  const setNewNotification = (newNotification) => {
    setNotification(newNotification);
    setTimeout(
      () => { setNotification(null) },
      NOTIFICATION_TIMEOUT
    );
  };

  const resetCreateNewForm = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const createNewBlogSubmitHandler = async (event) => {
    event.preventDefault();
  
    let newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    };

    resetCreateNewForm();

    try {
      const newAddedBlog = await blogServices.createNew(newBlog, user.token);
      const newBlogs = [...blogs, newAddedBlog];
      setBlogs(newBlogs);
      setNewNotification({ positive: true, message: `New blog ${newBlog.title} by ${newBlog.author} added.`});
      createNewFormRef.current.toggleVisibility();
    }
    catch (err) {
      setNewNotification({ positive: false, message: `Adding new blog failed.`});
    }
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

    setUsername('');
    setPassword('');
    
    try {
      const newUser = await userServices.login(userCredentials);
      window.localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setNewNotification({ positive: true, message: `${newUser.username} logged in.` });
    }
    catch(err) {
      setNewNotification({ positive: false, message: 'Log in failed.' });
    }
    

    
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

  const createNewFormRef = useRef();
  const createNewFormContent = () => {
    return (
      <React.Fragment>
        <Togglable
          showContentButtonLabel='Create New Blog'
          hideContentButtonLabel='Cancel'
          resetFn={resetCreateNewForm}
          ref={createNewFormRef}
        >
          <CreateNewBlogForm
            title={title}
            author={author}
            url={url}
            titleChangeHandler={inputChangeHandler(setTitle)}
            authorChangeHandler={inputChangeHandler(setAuthor)}
            urlChangeHandler={inputChangeHandler(setUrl)}
            createNewBlogSubmitHandler={createNewBlogSubmitHandler}
          />
        </Togglable>
        
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

  const notificationContent = () => {
    if(notification) return (
      <Notification
        positive={notification.positive}
        message={notification.message}
      />
    );
    return null;
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
        notificationContent()
      }
      {
        user ? contentIfLoggedIn(): loginForm()
      }
    </div>
  )
}

export default App