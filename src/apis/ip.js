import axios from './axios_config';

export const getDestinationIps = async (ip) => {
  const response = await axios.get(`/ip/dst/${ip}`);

  return response.data;
};

export const getSourceIps = async (ip) => {
  const response = await axios.get(`/ip/src/${ip}`);

  return response.data;
};
export const getCulpritDetail = async (signame) => {
  const response = await axios.get(`/ip/getCulpritDetail/${signame}`);
  return response.data;
};
export const getTodayCulpritDetail = async (signame) => {
  const response = await axios.get(`/ip/getTodayCulpritDetail/${signame}`);
  return response.data;
};
export const getStatisticLocalSourceIp = async () => {
  const response = await axios.get('ip/statistic/src/local');

  return response.data;
};
export const getStatisticLocalDstIp = async () => {
  const response = await axios.get('ip/statistic/dst/local');

  return response.data;
};
export const getStatisticExternalSourceIp = async () => {
  const response = await axios.get('/ip/statistic/src/external');

  return response.data;
};
export const getStatisticExternalDstIp = async () => {
  const response = await axios.get('/ip/statistic/dst/external');

  return response.data;
};
export const getIPStatus = async (ip) => {
  const response = await axios.get(`/ip/status/${ip}`);

  return response.data;
};
export const getIPAlertCurDate = async (ip) => {
  const response = await axios.get(`/ip/alert/${ip}`);

  return response.data;
};
export const getStatisticByIP = async (ip) => {
  const response = await axios.get(`/ip/statistic/${ip}`);

  return response.data;
};
export const getBlockList = async () => {
  const response = await axios.get('/block/list');

  return response.data;
};
export const getCulpritDetailBySigAndIP = async (signame, ip) => {
  const response = await axios.get(`/ip/getCulpritDetail/${signame}/${ip}`);
  return response.data;
};
export const getCulpritDetailByPriorityAndIP = async (priority, ip) => {
  const response = await axios.get(
    `/ip/getCulpritByVictimAndPriority/${priority}/${ip}`
  );
  return response.data;
};
