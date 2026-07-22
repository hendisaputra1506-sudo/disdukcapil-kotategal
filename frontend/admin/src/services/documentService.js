import { fetchApi } from './api';

/**
 * Fetch daftar dokumen pelayanan dari backend API.
 * GET /api/documents
 */
export async function getDocuments(params = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page);
  if (params.limit) query.append('limit', params.limit);
  if (params.search) query.append('search', params.search);

  const queryString = query.toString();
  const endpoint = `/api/documents${queryString ? `?${queryString}` : ''}`;
  return await fetchApi(endpoint);
}

/**
 * Fetch detail 1 dokumen berdasarkan ID.
 * GET /api/documents/:id
 */
export async function getDocumentById(id) {
  return await fetchApi(`/api/documents/${id}`);
}

/**
 * Tambah dokumen pelayanan baru (FormData).
 * POST /api/documents
 */
export async function createDocument(formData) {
  return await fetchApi('/api/documents', {
    method: 'POST',
    body: formData,
  });
}

/**
 * Perbarui metadata / file dokumen pelayanan (FormData).
 * PUT /api/documents/:id
 */
export async function updateDocument(id, formData) {
  return await fetchApi(`/api/documents/${id}`, {
    method: 'PUT',
    body: formData,
  });
}

/**
 * Hapus dokumen pelayanan berdasarkan ID.
 * DELETE /api/documents/:id
 */
export async function deleteDocument(id) {
  return await fetchApi(`/api/documents/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Mendapatkan URL unduh aman dokumen.
 */
export function getDocumentDownloadUrl(id) {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  return `${baseUrl}/api/documents/${id}/download`;
}
