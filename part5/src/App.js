import React, { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
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
  const [notification, setNotification] = useState(null);

  const appRef = useRef();

  const createNewBlogSubmitHandler = async (event) => {
    event.preventDefault();

    let newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    };

    await addNewBlog(newBlog);
    appRef.current.resetCreateNewForm();
    appRef.current.createNewFormRef.current.toggleVisibility();
  }

  const addNewBlog = async (newBlog) => {
    try {
      const newAddedBlog = await blogServices.createNew(newBlog, user.token);
      newAddedBlog.user = {
        id: user.id,
        name: user.name,
        username: user.username
      };
      const newBlogs = [...blogs, newAddedBlog];
      setBlogs(newBlogs);
      setNewNotification({
        positive: true,
        message: `New blog ${newBlog.title} by ${newBlog.author} added.`,
      });
    } catch (err) {
      setNewNotification({
        positive: false,
        message: 'Adding new blog failed.',
      });
    }
  };

  const setNewNotification = (newNotification) => {
    setNotification(newNotification);
    setTimeout(() => {
      setNotification(null);
    }, NOTIFICATION_TIMEOUT);
  };

  const logoutButtonHandler = () => {
    setUser(null);
    window.localStorage.removeItem('user');
  };

  const loginFormSubmitHandler = async (event) => {
    event.preventDefault();

    const userCredentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    setUsername('');
    setPassword('');

    try {
      const newUser = await userServices.login(userCredentials);
      window.localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setNewNotification({
        positive: true,
        message: `${newUser.username} logged in.`,
      });
    } catch (err) {
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
      if (user) {
        const blogs = await blogServices.getAll();
        setBlogs(blogs.sort((blog1, blog2) => blog1.likes - blog2.likes));
      } else return [];
    })();
  }, [user]);

  useEffect(() => {
    const existingUser = window.localStorage.getItem('user');
    if (existingUser) setUser(JSON.parse(existingUser));
  }, []);

  const likeButtonHandler = async (blog, blogId) => {
    const updatedBlog = await blogServices.updateABlogEntry(blog, user.token, blogId);
    const newBlogs = blogs.map(blog => { return { ...blog }});
    const oldBlog = newBlogs.find(blog => blog.id.localeCompare(updatedBlog.id) === 0);
    oldBlog.likes = updatedBlog.likes;
    setBlogs(newBlogs);
  };

  const removeButtonHandler = (blogId) => {
    return async () => {
      try {
        const yes = window.confirm('Are you sure?');
        if(!yes) return;
        await blogServices.removeBlog(blogId, user.token);
        const newBlogs = blogs.filter(blog => blog.id.localeCompare(blogId) !== 0);
        setBlogs(newBlogs);
        setNewNotification({ positive: true, message: 'Blog deleted successfully!!' });
      }
      catch(err) {
        setNewNotification({ positive: false, message: 'Blog deletion failed!!' });
      }
    };
  };

  const blogsContent = () => {
    return (
      <div id='blogs'>
        {
          blogs
            .sort((blog1, blog2) => blog2.likes - blog1.likes)
            .map((blog) => <Blog
              key={blog.id}
              blog={blog}
              likeButtonHandler={likeButtonHandler}
              removeButtonHandler={removeButtonHandler(blog.id)}
            />)
        }
      </div>
    );
  };

  const notificationContent = () => {
    if (notification)
      return (
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
        <CreateNewBlogForm createNewBlogSubmitHandler={createNewBlogSubmitHandler} ref={appRef}/>
        { blogsContent() }
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
      {notificationContent()}
      {user ? contentIfLoggedIn() : loginForm()}
    </div>
  );
};

export default App;
