import { fetchApi } from './api';

/**
 * Fetch list galeri dari backend API dengan opsi pagination, search, & category filter.
 * GET /api/gallery
 */
export async function getGalleries(params = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page);
  if (params.limit) query.append('limit', params.limit);
  if (params.search) query.append('search', params.search);
  if (params.category) query.append('category', params.category);

  const queryString = query.toString();
  const endpoint = `/api/gallery${queryString ? `?${queryString}` : ''}`;
  return await fetchApi(endpoint);
}

/**
 * Fetch detail 1 galeri berdasarkan ID.
 * GET /api/gallery/:id
 */
export async function getGalleryById(id) {
  return await fetchApi(`/api/gallery/${id}`);
}

/**
 * Tambah foto galeri baru (FormData).
 * POST /api/gallery
 */
export async function createGallery(formData) {
  return await fetchApi('/api/gallery', {
    method: 'POST',
    body: formData,
  });
}

/**
 * Perbarui foto galeri existing (FormData).
 * PUT /api/gallery/:id
 */
export async function updateGallery(id, formData) {
  return await fetchApi(`/api/gallery/${id}`, {
    method: 'PUT',
    body: formData,
  });
}

/**
 * Hapus foto galeri berdasarkan ID.
 * DELETE /api/gallery/:id
 */
export async function deleteGallery(id) {
  return await fetchApi(`/api/gallery/${id}`, {
    method: 'DELETE',
  });
}
