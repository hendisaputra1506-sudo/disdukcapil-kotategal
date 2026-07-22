import { fetchApi } from './api';

/**
 * Service API untuk Pengelolaan Banner Header/Hero (Banner Management)
 */

export const getBanners = async (params = {}) => {
  const queryParams = new URLSearchParams();

  if (params.status) queryParams.append('status', params.status);

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/api/banners?${queryString}` : '/api/banners';

  return fetchApi(endpoint, {
    method: 'GET',
  });
};

export const getBannerById = async (id) => {
  return fetchApi(`/api/banners/${id}`, {
    method: 'GET',
  });
};

export const createBanner = async (formData) => {
  return fetchApi('/api/banners', {
    method: 'POST',
    body: formData,
  });
};

export const updateBanner = async (id, formData) => {
  return fetchApi(`/api/banners/${id}`, {
    method: 'PUT',
    body: formData,
  });
};

export const deleteBanner = async (id) => {
  return fetchApi(`/api/banners/${id}`, {
    method: 'DELETE',
  });
};
