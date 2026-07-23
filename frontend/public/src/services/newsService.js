import { fetchApi } from './api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Format path URL gambar agar selalu absolut mengarah ke backend API
 */
const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  // Hilangkan trailing slash dari API_BASE_URL jika ada
  const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '');
  return `${baseUrl}${imagePath}`;
};

export const newsService = {
  /**
   * Mengambil daftar berita untuk website publik
   * @param {Object} params - { page, limit, search, category }
   */
  getNews: async (params = {}) => {
    // Selalu paksa status=published untuk publik
    const query = new URLSearchParams({ ...params, status: 'published' }).toString();
    const response = await fetchApi(`/news?${query}`);
    
    // Transformasi URL gambar
    if (response?.data) {
      response.data = response.data.map(item => ({
        ...item,
        thumbnail: getFullImageUrl(item.thumbnail)
      }));
    }
    return response;
  },

  /**
   * Mengambil detail berita berdasarkan ID
   * @param {number|string} id 
   */
  getNewsById: async (id) => {
    const response = await fetchApi(`/news/${id}`);
    
    // Transformasi URL gambar dan pastikan beritanya published
    if (response?.data) {
      if (response.data.status !== 'published') {
        throw new Error('Berita belum dipublikasikan');
      }
      response.data.thumbnail = getFullImageUrl(response.data.thumbnail);
    }
    return response;
  }
};
