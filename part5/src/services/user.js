import axios from 'axios';

const loginUrl = '/api/login';

const login = async (user) => {
  const config = {
    method: 'post',
    url: loginUrl,
    data: user
  };
  try {
    const res = await axios(config);
    return res.data;
  }
  catch(err) {
    throw err;
  }
};

const userServices = {
  login
};

export default userServices;