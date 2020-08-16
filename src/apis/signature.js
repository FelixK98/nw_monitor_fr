import sig from './axios_config';

export const getSig = async () => {
  const response = await sig.get('/sig');

  return response.data;
};

export const getSigTop = async () => {
  const response = await sig.get('/sig/top');

  return response.data;
};
export const getTodaySigTop = async () => {
  const response = await sig.get('/sig/top/today');

  return response.data;
};
