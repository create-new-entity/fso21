import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { createSetBlogAction } from '../reducers/blogReducer';



const Blog = ({ likeButtonHandler, removeButtonHandler }) => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector(state => state.blog);
  console.log(blog);

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

  const detailsContent = () => {
    return (
      <React.Fragment>
        <p className='url'>{blog.url}</p>
        <p className='likes'>likes {blog.likes}</p>
        <button className='likeButton' onClick={likeHandler}>like</button>
        <div>
          <button onClick={remove(blog.id)}>remove</button>
        </div>
      </React.Fragment>
    );
  };

  if(!blog) return <h1>Loading...</h1>;

  return (
    <div className='blog'>
      <div className='title'>
        {blog.title}
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