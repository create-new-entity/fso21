const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

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

const reducer = (state = initialState, action) => {

  const sortByVoteFn = (anec1, anec2) => {
    return -1 * (anec1.votes - anec2.votes);
  };

  switch(action.type) {
    case 'VOTE':
      const foundAnecdoteIndex = state.findIndex(anecdote => anecdote.id === action.data.id);
      if(foundAnecdoteIndex === -1) return state;
      const foundAnecdote = { ...state[foundAnecdoteIndex] };
      foundAnecdote.votes = foundAnecdote.votes + 1;
      const newAnecdotes = [...state];
      newAnecdotes.splice(foundAnecdoteIndex, 1, foundAnecdote);
      newAnecdotes.sort(sortByVoteFn);
      return newAnecdotes;
    case 'NEW_NOTE':
      return state.concat(action.data);
    default:
      return state;
  }
}

export default reducer