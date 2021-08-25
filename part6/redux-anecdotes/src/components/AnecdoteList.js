import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  createVoteAction,
  createInitializeAction
} from './../reducers/anecdoteReducer';
import { 
  createShowNotificationAction
} from './../reducers/notificationReducer';

const AnecdoteList = (props) => {

  const createInitializeAction = props.createInitializeAction;

  useEffect(() => {
    createInitializeAction();
  }, [createInitializeAction]);
  
  const anecdotes = props.anecdotes;
  const filter = props.filter;

  const vote = (id) => {
    const anecdote = filteredAnecdotes.find(anecdote => anecdote.id === id);
    props.createVoteAction(id);
    props.createShowNotificationAction(`You voted ${anecdote.content}`, true, 5000);
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


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

const mapDispatchToProps = {
  createVoteAction,
  createInitializeAction,
  createShowNotificationAction
};

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);

export default ConnectedAnecdoteList;