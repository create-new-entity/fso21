import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(anecdotes.map( _ => 0 ));
  const [mostVoted, setMostVoted] = useState(0);
  const [mostVotes, setMostVotes] = useState(0);

  const nextAnecdoteClickHandler = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const voteButtonHandler = () => {
    let newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
    console.log('newVotes[selected]', newVotes[selected]);
    console.log('mostVoted', mostVoted);
    console.log('newVotes[selected] > mostVoted', newVotes[selected] > mostVoted);
    if(newVotes[selected] > mostVotes) {
      setMostVoted(selected);
      setMostVotes(newVotes[selected]);
    }
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteButtonHandler}>vote</button>
      <button onClick={nextAnecdoteClickHandler}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
      <p>has {mostVotes} votes</p>
    </div>
  )
}

export default App