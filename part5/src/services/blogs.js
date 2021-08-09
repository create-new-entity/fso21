import axios from 'axios'


const baseUrl = '/api/blogs';

const getAll = async () => {
  const config = {
    method: 'get',
    url: baseUrl
  };
  
  const res = await axios(config);
  return res.data;
}


const blogServices = {
  getAll
};

export default blogServices;