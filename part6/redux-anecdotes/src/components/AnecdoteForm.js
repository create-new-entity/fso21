import React from 'react';
import { useDispatch } from 'react-redux';
import { createAddNewNoteAction } from './../reducers/anecdoteReducer';


const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createHandler = (event) => {
    event.preventDefault();

    dispatch(createAddNewNoteAction(event.target.new_anecdote.value));
    event.target.new_anecdote.value = '';
  };

  return (
    <React.Fragment>
      <form onSubmit={createHandler}>
        <div><input name='new_anecdote'/></div>
        <button>create</button>
      </form>
    </React.Fragment>
  );
};

export default AnecdoteForm;