import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { createSetUserDataAction } from '../reducers/userDataReducer';


const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const userData  = useSelector(state => state.userData);

  useEffect(() => {
    dispatch(createSetUserDataAction(id));
  }, [id]);

  const userDataContent = () => {
    if(!userData) return <p>Content loading...</p>;
    return (
      <React.Fragment>
        <h1>{ userData.name }</h1>
        <h2>added blogs</h2>
        <ul>
          { userData.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>) }
        </ul>
      </React.Fragment>
    );
  };

  return userDataContent();
};

export default User;