import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { createSetBlogAction } from '../reducers/blogReducer';



const Blog = ({ likeButtonHandler, removeButtonHandler }) => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    blog, user
  } = useSelector(state => {
    return {
      blog: state.blog,
      user: state.user
    };
  });

  useEffect(() => {
    dispatch(createSetBlogAction(id));
  }, [id]);

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

  const remove = (id) => {
    return () => {
      removeButtonHandler(id);
    }
  };

  const removeButton = (blogCreatorId) => {
    if(blogCreatorId !== user.id) return null;
    return (
      <div>
        <button onClick={remove(blog.id)}>remove</button>
      </div>
    );
  };

  const detailsContent = () => {
    const inlineBlockStyle = {
      display: 'inline-block',
      margin: 5
    };
    return (
      <React.Fragment>
        <Link to={{ pathname: blog.url }} target='_blank'>{blog.url}</Link>
        <div>
          <p className='likes' style={inlineBlockStyle}>{blog.likes} likes</p>
          <button className='likeButton' style={inlineBlockStyle} onClick={likeHandler}>like</button>
        </div>
        <p style={ { margin: 0 } }>added by {blog.user.name}</p>
        {
          removeButton(blog.user.id)
        }
      </React.Fragment>
    );
  };

  if(!blog) return <h1>Loading...</h1>;

  return (
    <div className='blog'>
      <div className='title'>
        <h2>{blog.title}</h2>
      </div>
      {
        detailsContent()
      }
    </div>
  )
};

export default Blog;