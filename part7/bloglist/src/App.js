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

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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

  const useStyles = makeStyles({
    navBar: {
      background: 'rgb(63, 148, 113)',
      border: 0,
      borderRadius: 3,
      padding: 10
    },
    navBar__item: {
      color: 'white',
      textDecoration: 'none',
      '&:hover': {
        color: 'black'
      }
    },
    navBar__message: {
      color: 'white'
    },
    pageTitle: {
      color: 'rgb(75, 165, 216)'
    }
  });

  const classes = useStyles();

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

  const inlineBlockStyle = {
    display: 'inline-block',
    margin: 5
  };

  const navigationBar = () => {
    if (!user) return null;

    return (
      <React.Fragment>
        <div className={classes.navBar}>
          <Box display="inline" m={1}>
            <Link to="/blogs" className={classes.navBar__item}>Blogs</Link>
          </Box>
          <Box display="inline" m={1}>
            <Link to="/users" className={classes.navBar__item}>Users</Link>
          </Box>
        </div>

        <h2 className={classes.pageTitle}>Blog App</h2>
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
        {blogs
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
          .map((blog) => {
            return (
              <div key={blog.id} style={blogStyle}>
                <Link to={`${location.pathname}/${blog.id}`}>{blog.title}</Link>
              </div>
            );
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

  const footer = () => {
    if(!user) return null;
    return (
      <div className={classes.navBar}>
        <p style={inlineBlockStyle} className={classes.navBar__message}>{user.name} logged in</p>
        <button style={inlineBlockStyle} onClick={logoutButtonHandler}>Logout</button>
      </div>
    );
  };


  return (
    <div>
      { navigationBar() }
      { notificationContent() }
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
          {user ? <Redirect to="/blogs" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
      { footer() }
    </div>
  );
};

export default App;
