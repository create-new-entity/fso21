import axios from 'axios';

const loginUrl = '/api/login';

const login = async (user) => {
  const config = {
    method: 'post',
    url: loginUrl,
    data: user
  };

  const res = await axios(config);
  return res.data;
};

const userServices = {
  login
};

export default userServices;