import axios from 'axios';

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

const updateABlogEntry = async (blog, token, blogId) => {
  const config = {
    method: 'put',
    url: `${baseUrl}/${blogId}`,
    headers: {
      'Authorization': `bearer ${token}`
    },
    data: blog
  };

  const res = await axios(config);
  return res.data;
};

const removeBlog = async (blogId, token) => {
  const config = {
    method: 'delete',
    url: `${baseUrl}/${blogId}`,
    headers: {
      'Authorization': `bearer ${token}`
    }
  };

  await axios(config);
};


const blogServices = {
  getAll,
  createNew,
  updateABlogEntry,
  removeBlog
};

export default blogServices;