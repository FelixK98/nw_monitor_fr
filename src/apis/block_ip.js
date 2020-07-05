import axios from './python_axios_config';

export const getBlockList = async () => {
  const response = await axios.get('/all');

  return response.data;
};
export const getBlockListByInterface = async (interfac) => {
  const response = await axios.get(`/list/${interfac}`);

  return response.data;
};
export const addBlockIP = async (ip) => {
  const response = await axios.get(`/add/${ip}`);

  return response.data;
};
export const unblockIP = async (ip) => {
  const response = await axios.get(`/unblock/${ip}`);

  return response.data;
};
export const getNodesOnlineOffline = async (ip) => {
  const response = await axios.get(`/nodes/isOnline/${ip}`);

  return response.data;
};
export const isIPInBlockList = async (ip) => {
  const response = await axios.get(`/check/${ip}`);

  return response.data;
};
