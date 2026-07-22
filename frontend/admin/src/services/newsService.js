import { fetchApi } from './api';

/**
 * Service API untuk Pengelolaan Berita (News Management)
 */

export const getNews = async (params = {}) => {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);
  if (params.search) queryParams.append('search', params.search);
  if (params.category) queryParams.append('category', params.category);
  if (params.status) queryParams.append('status', params.status);

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/api/news?${queryString}` : '/api/news';

  return fetchApi(endpoint, {
    method: 'GET',
  });
};

export const getNewsById = async (id) => {
  return fetchApi(`/api/news/${id}`, {
    method: 'GET',
  });
};

export const createNews = async (formData) => {
  return fetchApi('/api/news', {
    method: 'POST',
    body: formData,
  });
};

export const updateNews = async (id, formData) => {
  return fetchApi(`/api/news/${id}`, {
    method: 'PUT',
    body: formData,
  });
};

export const deleteNews = async (id) => {
  return fetchApi(`/api/news/${id}`, {
    method: 'DELETE',
  });
};
