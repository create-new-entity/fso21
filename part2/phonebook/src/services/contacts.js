import axios from 'axios';

const baseURL = '/api/persons';

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

const nameAlreadyExists = (newName) => {
  return getAll()
    .then( currentContacts => {
      return currentContacts
        .some(contact => contact.name.toLowerCase().localeCompare(newName.toLowerCase()) === 0);
    })
    .catch( _ => {
      throw new Error();
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

const updateExisting = (person) => {
  const config = {
    method: 'put',
    url: `${baseURL}/${person.id}`,
    data: person,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios(config)
    .then(response => {
      return response.data;
    })
    .catch( _ => {
      throw new Error('Update failed.');
    });
}

const deleteContact = (id) => {
  const config = {
    method: 'delete',
    url: `${baseURL}/${id}`,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios(config)
    .then( response => {
      if(response.status !== 204) throw new Error('Delete request failed.');
    });
};

const backEndFns = {
  getAll,
  createNew,
  deleteContact,
  nameAlreadyExists,
  updateExisting
}

export default backEndFns;