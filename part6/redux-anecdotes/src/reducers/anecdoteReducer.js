const getId = () => (100000 * Math.random()).toFixed(0);

export const createVoteAction = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  };
};

export const createAddNewNoteAction = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  };
};

export const createInitializeAction = (anecdotes) => {
  return {
    type: 'INITIALIZE',
    data: anecdotes
  };
};

const anecdotes = (state = [], action) => {

  const sortByVoteFn = (anec1, anec2) => {
    return -1 * (anec1.votes - anec2.votes);
  };

  let newAnecdotes;

  switch(action.type) {
    case 'VOTE':
      const foundAnecdoteIndex = state.findIndex(anecdote => anecdote.id === action.data.id);
      if(foundAnecdoteIndex === -1) return state;
      const foundAnecdote = { ...state[foundAnecdoteIndex] };
      foundAnecdote.votes = foundAnecdote.votes + 1;
      newAnecdotes = [...state];
      newAnecdotes.splice(foundAnecdoteIndex, 1, foundAnecdote);
      newAnecdotes.sort(sortByVoteFn);
      return newAnecdotes;
    case 'NEW_NOTE':
      newAnecdotes = state.concat(action.data);
      return newAnecdotes;
    case 'INITIALIZE':
      return action.data;
    default:
      return state;
  }
};

export const anecdoteStateName = 'anecdotes';
export default anecdotes;