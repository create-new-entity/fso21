import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createVoteAction } from './../reducers/anecdoteReducer';
import { 
  createShowNotificationAction,
  createHideNotificationAction
} from './../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const dispatch = useDispatch();

  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id);
    dispatch(createVoteAction(id));
    dispatch(createShowNotificationAction(`You voted ${anecdote.content}`, true));
    setTimeout(() => {
      dispatch(createHideNotificationAction());
    }, 5000);
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default AnecdoteList;