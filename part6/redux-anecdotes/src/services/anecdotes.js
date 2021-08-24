import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const res = await axios.get(baseURL);
  return res.data;
};

const createNewAnecdote = async (anecdote) => {
  const res = await axios.post(baseURL, anecdote);
  return res.data;
};

const updateVote = async (id, votes) => {
  await axios.patch(`${baseURL}/${id}`, { votes });
};

const anecdotesServices = {
  getAll,
  createNewAnecdote,
  updateVote
};

export default anecdotesServices;