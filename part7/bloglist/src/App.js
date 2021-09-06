import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import CreateNewBlogForm from './components/CreateNewBlogForm';
import Users from './components/Users';
import User from './components/User';

import {
  createInitializeBlogsAction,
  createBlogLikedAction,
  createAddNewBlogAction,
  createRemoveBlogAction,
} from './reducers/blogsReducer';

import { createSetUsernameAction } from './reducers/usernameReducer';

import { createSetPasswordAction } from './reducers/passwordReducer';

import {
  createSetUserToNull,
  createSetExistingUser,
  createSetNewUser,
} from './reducers/userReducer';

import { createSetUsersDataAction } from './reducers/usersDataReducer';

const App = () => {
  const { blogs, notification, username, password, user } = useSelector(
    (state) => {
      return {
        blogs: state.blogs,
        notification: state.notification,
        username: state.username,
        password: state.password,
        user: state.user,
      };
    }
  );
  const dispatch = useDispatch();
  const appRef = useRef();
  const history = useHistory();
  const location = useLocation();

  const createNewBlogSubmitHandler = async (event) => {
    event.preventDefault();

    let newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };

    await addNewBlog(newBlog);
    appRef.current.resetCreateNewForm();
    appRef.current.createNewFormRef.current.toggleVisibility();
  };

  const addNewBlog = async (newBlog) =>
    dispatch(createAddNewBlogAction(newBlog, user));

  const logoutButtonHandler = () => {
    dispatch(createSetUserToNull());
    history.push('/');
  };

  const loginFormSubmitHandler = async (event) => {
    event.preventDefault();

    const userCredentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    dispatch(createSetUsernameAction(''));
    dispatch(createSetPasswordAction(''));
    dispatch(createSetNewUser(userCredentials));
    history.push('/blogs');
  };

  const onUsernameChange = (event) => {
    dispatch(createSetUsernameAction(event.target.value));
  };

  const onPasswordChange = (event) => {
    dispatch(createSetPasswordAction(event.target.value));
  };

  useEffect(() => {
    (async () => {
      if (user) {
        dispatch(createInitializeBlogsAction());
        dispatch(createSetUsersDataAction());
      } else return [];
    })();
  }, [user]);

  useEffect(() => {
    dispatch(createSetExistingUser());
  }, []);

  const likeButtonHandler = () => {
    return async (blog, blogId) => {
      dispatch(createBlogLikedAction(blog, blogId, user.token));
    };
  };

  const removeButtonHandler = (blogId) => {
    const yes = window.confirm('Are you sure?');
    if (!yes) return;
    dispatch(createRemoveBlogAction(blogId, user.token));
    history.push('/');
  };

  const navBarStyle = {
    backgroundColor: 'rgb(194, 197, 205)',
    margin: 5
  };

  const navBarChildStyle = {
    display: 'inline-block',
    margin: 5
  };

  const navigationBar = () => {
    if(!user) return null;
    return (
      <React.Fragment>
        <div style={navBarStyle}>
          <Link to='/blogs' style={navBarChildStyle}>blogs</Link>
          <Link to='/users'style={navBarChildStyle}>users</Link>
          <p style={navBarChildStyle}>{user.name} logged in</p>
          <button onClick={logoutButtonHandler} style={navBarChildStyle}>logout</button>
        </div>
        <h2>blog app</h2>
      </React.Fragment>
    );
  };

  const blogsContent = () => {
    const blogStyle = {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
    };

    return (
      <div id="blogs">
        {
          blogs
            .sort((blog1, blog2) => blog2.likes - blog1.likes)
            .map((blog) => {
              return <div key={blog.id} style={blogStyle}>
                <Link to={`${location.pathname}/${blog.id}`}>
                  {blog.title}
                </Link>
              </div>
            })}
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

  const blogsStuffs = () => {
    return (
      <React.Fragment>
        <CreateNewBlogForm
          createNewBlogSubmitHandler={createNewBlogSubmitHandler}
          ref={appRef}
        />
        {blogsContent()}
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
      { navigationBar() }
      {notificationContent() }
      <Switch>
        <Route path="/blogs/:id">
          <Blog
            likeButtonHandler={likeButtonHandler()}
            removeButtonHandler={removeButtonHandler}
          />
        </Route>
        <Route path="/blogs">
          {user ? blogsStuffs() : <Redirect to="/login" />}
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">{user ? <Users /> : null}</Route>
        <Route path="/login">{user ? <Redirect to="/" /> : loginForm()}</Route>
        <Route path="/">
          {user ? <Redirect to='/blogs'/> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
