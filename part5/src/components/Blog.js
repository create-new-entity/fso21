import React, { useState } from 'react';


const Blog = ({ blog, likeButtonHandler }) => {
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
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={likeHandler}>like</button></p>
        <p>{blog.author}</p>
      </React.Fragment>
    );
  };

  
  
  return (
    <div style={blogStyle}>
      {blog.title} <button style={viewButtonStyle} onClick={viewButtonHandler}>{ view ? 'hide' : 'view'}</button>
      {
        detailsContent()
      }
    </div>  
  )
};

export default Blog;