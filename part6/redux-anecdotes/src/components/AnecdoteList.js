import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  createVoteAction,
  createInitializeAction
} from './../reducers/anecdoteReducer';
import { 
  createShowNotificationAction,
  createHideNotificationAction
} from './../reducers/notificationReducer';
import anecdotesServices from '../services/anecdotes';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdotesServices.getAll().then(anecdotes => {
      dispatch(createInitializeAction(anecdotes));
    });
  }, [dispatch]);

  const { anecdotes, filter } = useSelector(state => {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter
    };
  });

  

  const vote = (id) => {
    const anecdote = filteredAnecdotes.find(anecdote => anecdote.id === id);
    dispatch(createVoteAction(id));
    dispatch(createShowNotificationAction(`You voted ${anecdote.content}`, true));
    setTimeout(() => {
      dispatch(createHideNotificationAction());
    }, 5000);
  }

  const filterAnecdotes = () => {
    if(!filter || !filter.length) return anecdotes;
    return anecdotes.filter(anecdote => anecdote.content.includes(filter));
  };

  const filteredAnecdotes = filterAnecdotes();

  return (
    <React.Fragment>
      {filteredAnecdotes.map(anecdote =>
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