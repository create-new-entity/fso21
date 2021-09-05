import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect, useHistory } from 'react-router';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import CreateNewBlogForm from './components/CreateNewBlogForm';
import LoggedInUser from './components/LoggedInUser';
import Users from './components/Users';

import {
  createInitializeBlogsAction,
  createBlogLikedAction,
  createAddNewBlogAction,
  createRemoveBlogAction
} from './reducers/blogsReducer';

import {
  createSetUsernameAction
} from './reducers/usernameReducer';

import {
  createSetPasswordAction
} from './reducers/passwordReducer';

import {
  createSetUserToNull,
  createSetExistingUser,
  createSetNewUser
} from './reducers/userReducer';

const App = () => {

  const {
    blogs,
    notification,
    username,
    password,
    user
  } = useSelector(state => {
    return {
      blogs: state.blogs,
      notification: state.notification,
      username: state.username,
      password: state.password,
      user: state.user
    };
  });
  const dispatch = useDispatch();
  const appRef = useRef();
  const history = useHistory();

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

  const addNewBlog = async (newBlog) => dispatch(createAddNewBlogAction(newBlog, user));

  const logoutButtonHandler = () => {
    dispatch(createSetUserToNull());
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
      } else return [];
    })();
  }, [user]);

  useEffect(() => {
    dispatch(createSetExistingUser());
  }, []);

  const likeButtonHandler = async (blog, blogId) => {
    dispatch(createBlogLikedAction(blog, blogId, user.token));
  };

  const removeButtonHandler = (blogId) => {
    return async () => {
      const yes = window.confirm('Are you sure?');
      if(!yes) return;
      dispatch(createRemoveBlogAction(blogId, user.token));
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

  const blogsStuffs = () => {
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

  const usersStuffs = () => {
    return (
      <React.Fragment>
        <LoggedInUser
          name={user.name}
          logoutButtonHandler={logoutButtonHandler}
        />
        <Users/>
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

  console.log('user', user);

  return (
    <div>
      { notificationContent() }
      <Switch>
        <Route path='/blogs'>
          { user ? blogsStuffs() : <Redirect to='/login'/> }
        </Route>
        <Route path='/users'>
          { user ? usersStuffs() : null }
        </Route>
        <Route path='/login'>
          { user ? <Redirect to='/'/> : loginForm() }
        </Route>
        <Route path='/'>
          { user ? blogsStuffs() : <Redirect to='/login'/> }
        </Route>
      </Switch>
    </div>
  );
};

export default App;
