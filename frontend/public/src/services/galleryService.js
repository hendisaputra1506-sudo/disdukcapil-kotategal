import { fetchApi } from './api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '');
  return `${baseUrl}${imagePath}`;
};

export const galleryService = {
  getGalleryList: async (page = 1, limit = 10, category = '') => {
    try {
      const query = new URLSearchParams();
      if (page) query.append('page', page);
      if (limit) query.append('limit', limit);
      if (category) query.append('category', category);
      
      const response = await fetchApi(`/galleries?${query.toString()}`);
      
      // Normalize image URLs
      if (response?.data) {
        response.data = response.data.map(item => ({
          ...item,
          image_path: getFullImageUrl(item.image_path)
        }));
      }
      return response;
    } catch (error) {
      console.error('Error fetching gallery:', error);
      throw error;
    }
  }
};
