import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  createCommentInputChangedAction,
  createAddACommentAction,
} from './../reducers/commentInputReducer';

const Comments = ({ comments }) => {
  const { blogs, blog, user, commentInput } = useSelector((state) => {
    return {
      blogs: state.blogs,
      blog: state.blog,
      user: state.user,
      commentInput: state.commentInput
    };
  });
  const dispatch = useDispatch();

  const commentInputChangedHandler = (event) => {
    dispatch(createCommentInputChangedAction(event.target.value));
  };

  const addCommentFormHandler = (event) => {
    event.preventDefault();
    dispatch(createAddACommentAction(blogs, blog, commentInput, user.token));
  };

  const createNewCommentContent = () => {
    return (
      <React.Fragment>
        <form onSubmit={addCommentFormHandler}>
          <input type='text' value={commentInput} onChange={commentInputChangedHandler} />
          <button type='submit'>Add Comment</button>
        </form>
      </React.Fragment>
    );
  };

  if (!comments || !comments.length) return null;
  return (
    <div>
      <h2>comments</h2>
      { createNewCommentContent() }
      <ul>
        {comments.map((commentObj) => (
          <li key={commentObj.id}>{commentObj.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
