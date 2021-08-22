import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createVoteAction, createAddNewNoteAction } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(createVoteAction(id));
  }

  const createHandler = (event) => {
    event.preventDefault();

    dispatch(createAddNewNoteAction(event.target.new_anecdote.value));
    event.target.new_anecdote.value = '';
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createHandler}>
        <div><input name='new_anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App