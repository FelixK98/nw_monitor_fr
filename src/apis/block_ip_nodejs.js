import axios from './axios_config';

export const getBlockList = async (req, res) => {
  const response = await axios.get('/block/list');

  return response.data;
};
export const addBlockIP = async (ip) => {
  const response = await axios.get(`block/add/${ip}`);

  return response.data;
};
export const deleteBlockIP = async (ip) => {
  const response = await axios.get(`/block/delete/${ip}`);

  return response.data;
};
