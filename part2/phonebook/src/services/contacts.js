import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
  return axios
    .get(baseURL)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error('Getting all contacts failed.');
    });
};

const createNew = (contact) => {
  const config = {
    method: 'post',
    url: baseURL,
    data: contact,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios(config)
    .then(response => {
      return response.data;
    })
    .catch( _ => {
      throw new Error('Creating new contact failed.');
    });
};

const backEndFns = {
  getAll,
  createNew
}

export default backEndFns;