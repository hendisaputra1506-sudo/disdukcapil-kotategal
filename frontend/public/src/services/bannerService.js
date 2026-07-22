import { fetchApi } from './api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  const baseUrl = API_BASE_URL.replace(/\/$/, '');
  return `${baseUrl}${imagePath}`;
};

export const bannerService = {
  /**
   * Mengambil daftar banner aktif
   */
  getBanners: async () => {
    // Paksa hanya mengambil banner dengan status 'active'
    const query = new URLSearchParams({ status: 'active' }).toString();
    const response = await fetchApi(`/banners?${query}`);
    
    // Transformasi URL gambar
    if (response?.data) {
      response.data = response.data.map(item => ({
        ...item,
        image_path: getFullImageUrl(item.image_path)
      }));
    }
    return response;
  }
};
