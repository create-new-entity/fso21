import axios from 'axios'


const baseUrl = '/api/blogs';

const getAll = async () => {
  const config = {
    method: 'get',
    url: baseUrl
  };
  
  const res = await axios(config);
  return res.data;
};

const createNew = async (blog, token) => {
  const config = {
    method: 'post',
    url: baseUrl,
    headers: {
      'Authorization': `bearer ${token}`
    },
    data: blog
  };

  const res = await axios(config);
  return res.data;
};


const blogServices = {
  getAll,
  createNew
};

export default blogServices;