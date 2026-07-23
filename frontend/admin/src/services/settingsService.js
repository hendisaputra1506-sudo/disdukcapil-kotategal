import { fetchApi } from './api';

export const getSettings = async () => {
  return await fetchApi('/api/settings');
};

export const updateSettings = async (data) => {
  return await fetchApi('/api/settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};
