import axios from './axios_config';
export const addAccount = async (email) => {
  const response = await axios.post(`/account`, {
    email,
  });
  return response.data;
};
