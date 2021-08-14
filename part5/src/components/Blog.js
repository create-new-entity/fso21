import React, { useState } from 'react'


const Blog = ({blog}) => {
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

  console.log(blog);

  const likeButtonHandler = () => {
    console.log('Like Pressed');
  };

  const viewButtonHandler = () => {
    setView(!view);
  };

  const detailsContent = () => {
    if(!view) return null;
    return (
      <React.Fragment>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={likeButtonHandler}>like</button></p>
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

export default Blog