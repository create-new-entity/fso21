import React, { useState } from 'react';


const Blog = ({ blog, likeButtonHandler, removeButtonHandler }) => {
  const [view, setView] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingBottom:10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const viewButtonStyle = {
    marginLeft: 10
  };

  const viewButtonHandler = () => {
    setView(!view);
  };

  const likeHandler = async () => {
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    };

    await likeButtonHandler(newBlog, blog.id);
  };

  const detailsContent = () => {
    if(!view) return null;
    return (
      <React.Fragment>
        <p className='url'>{blog.url}</p>
        <p className='likes'>likes {blog.likes}</p>
        <button className='likeButton' onClick={likeHandler}>like</button>
        <div>
          <button onClick={removeButtonHandler}>remove</button>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div style={blogStyle} className='blog'>
      <div className='title'>
        {blog.title} <button className='viewButton' style={viewButtonStyle} onClick={viewButtonHandler}>{ view ? 'hide' : 'view'}</button>
      </div>
      <div className='author'>
        by {blog.author}
      </div>
      {
        detailsContent()
      }
    </div>
  )
};

export default Blog;