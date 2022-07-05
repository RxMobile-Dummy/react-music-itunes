const axios = require('axios').default;
import URL from './URL';

// To get data from GET Api

export const GetApi = async (reqUrl: String) => {
  const res = await axios.get(`${URL.BASE_URL}${reqUrl}`);
  return JSON.stringify(res.data);
};

