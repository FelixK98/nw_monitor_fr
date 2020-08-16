import axios from 'axios';

export const getAuthInfo = async (email) => {
  const response = await axios.get(`/auth/${email}`);
  return response.data;
};
export const getUserInfo = async () => {
  const response = await axios.get('/auth/current_user');
  return response.data;
};
export const getOnlineAccount = async () => {
  const response = await axios.get('/auth/online_account');
  return response.data;
};
