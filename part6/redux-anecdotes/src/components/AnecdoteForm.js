import React from 'react';
import { useDispatch } from 'react-redux';

import { createAddNewNoteAction } from './../reducers/anecdoteReducer';
import {
  createShowNotificationAction
} from './../reducers/notificationReducer';


const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const getId = () => (100000 * Math.random()).toFixed(0);

  const createHandler = (event) => {
    event.preventDefault();
    
    const newAnecdote = {
      content: event.target.new_anecdote.value,
      id: getId(),
      votes: 0
    };

    dispatch(createAddNewNoteAction(newAnecdote));
    dispatch(createShowNotificationAction(`${event.target.new_anecdote.value} created`, true, 5000));
    event.target.new_anecdote.value = '';
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