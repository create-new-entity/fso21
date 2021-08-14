import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import Togglable from './Togglable';


const CreateNewBlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const resetCreateNewForm = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const inputChangeHandler = (setFn) => {
    return (event) => {
      setFn(event.target.value);
    };
  };

  const createNewBlogSubmitHandler = async (event) => {
    event.preventDefault();

    let newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    };

    resetCreateNewForm();

    await addNewBlog(newBlog);
    createNewFormRef.current.toggleVisibility();
  };

  const createNewFormRef = useRef();

  return (
    <React.Fragment>
      <Togglable
        showContentButtonLabel='Create New Blog'
        hideContentButtonLabel='Cancel'
        resetFn={resetCreateNewForm}
        ref={createNewFormRef}
      >
        <h2>create new</h2>
        <form onSubmit={createNewBlogSubmitHandler}>
          <div>
            title: <input name='title' value={title} onChange={inputChangeHandler(setTitle)}/>
          </div>
          <div>
            author: <input name='author' value={author} onChange={inputChangeHandler(setAuthor)}/>
          </div>
          <div>
            url: <input name='url' value={url} onChange={inputChangeHandler(setUrl)}/>
          </div>
          <button type='submit'>Create</button>
        </form>
      </Togglable>
    </React.Fragment>
  );
};

CreateNewBlogForm.propTypes = {
  addNewBlog: PropTypes.func.isRequired
};

export default CreateNewBlogForm;