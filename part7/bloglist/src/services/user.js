import axios from 'axios';

const loginUrl = '/api/login';
const userDataUrl = '/api/users/userData';

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
    url: userDataUrl
  };

  const res = await axios(config);
  return res.data;
};

const userServices = {
  login,
  getUsersData
};

export default userServices;