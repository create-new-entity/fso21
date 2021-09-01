import React, { useState, useRef, useImperativeHandle } from 'react';

import Togglable from './Togglable';


const CreateNewBlogForm = React.forwardRef(
  (props, ref) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const createNewFormRef = useRef();

    const resetCreateNewForm = () => {
      setTitle('');
      setAuthor('');
      setUrl('');
    };

    useImperativeHandle(ref, () => {
      return {
        resetCreateNewForm,
        createNewFormRef
      };
    });

    const inputChangeHandler = (setFn) => {
      return (event) => {
        setFn(event.target.value);
      };
    };

    return (
      <React.Fragment>
        <Togglable
          showContentButtonLabel='Create New Blog'
          hideContentButtonLabel='Cancel'
          resetFn={resetCreateNewForm}
          ref={createNewFormRef}
        >
          <h2>create new</h2>
          <form className='createNewForm' onSubmit={props.createNewBlogSubmitHandler}>
            <label htmlFor='title'>title:</label>
            <input type='text' id='title' name='title' value={title} onChange={inputChangeHandler(setTitle)}/>
            <label htmlFor='author'>author:</label>
            <input type='text' id='author' name='author' value={author} onChange={inputChangeHandler(setAuthor)}/>
            <label htmlFor='url'>url:</label>
            <input type='text' id='url' name='url' value={url} onChange={inputChangeHandler(setUrl)}/>
            <button type='submit'>Create</button>
          </form>
        </Togglable>
      </React.Fragment>
    );
  }
);

CreateNewBlogForm.displayName = 'CreateNewBlogForm';

export default CreateNewBlogForm;
