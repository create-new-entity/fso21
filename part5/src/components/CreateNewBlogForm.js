import React from 'react';


const CreateNewBlogForm = ({ title, author, url, titleChangeHandler, authorChangeHandler, urlChangeHandler, createNewBlogSubmitHandler }) => {
  return (
    <React.Fragment>
      <h2>create new</h2>
      <form onSubmit={createNewBlogSubmitHandler}>
        <div>
          title: <input name='title' value={title} onChange={titleChangeHandler}/>
        </div>
        <div>
          author: <input name='author' value={author} onChange={authorChangeHandler}/>
        </div>
        <div>
          url: <input name='url' value={url} onChange={urlChangeHandler}/>
        </div>
        <button type='submit'>Create</button>
      </form>
    </React.Fragment>
  );
};

export default CreateNewBlogForm;