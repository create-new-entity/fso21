import React from 'react';
import { useDispatch } from 'react-redux';

import { createAddNewNoteAction } from './../reducers/anecdoteReducer';
import {
  createShowNotificationAction,
  createHideNotificationAction
} from './../reducers/notificationReducer';


const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createHandler = (event) => {
    event.preventDefault();

    dispatch(createAddNewNoteAction(event.target.new_anecdote.value));
    dispatch(createShowNotificationAction(`${event.target.new_anecdote.value} created`, true));
    event.target.new_anecdote.value = '';
    setTimeout(() => {
      dispatch(createHideNotificationAction());
    }, 5000);
  };

  return (
    <React.Fragment>
      <h2>create new</h2>
      <form onSubmit={createHandler}>
        <div><input name='new_anecdote'/></div>
        <button>create</button>
      </form>
    </React.Fragment>
  );
};

export default AnecdoteForm;