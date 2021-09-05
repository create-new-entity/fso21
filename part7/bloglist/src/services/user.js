import axios from 'axios';

const loginUrl = '/api/login';
const usersDataUrl = '/api/users/userData';

const login = async (user) => {
  const config = {
    method: 'post',
    url: loginUrl,
    data: user
  };

  const res = await axios(config);
  return res.data;
};

const getUsersData = async () => {
  const config = {
    method: 'get',
    url: usersDataUrl
  };

  const res = await axios(config);
  return res.data;
};

const getUserData = async (userId) => {
  const config = {
    method: 'get',
    url: `${usersDataUrl}/${userId}`
  };

  const res = await axios(config);
  return res.data;
};

const userServices = {
  login,
  getUsersData,
  getUserData
};

export default userServices;