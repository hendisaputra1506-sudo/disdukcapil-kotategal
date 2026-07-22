/**
 * Base API Wrapper untuk Public Website
 * Konfigurasi URL dan penanganan error dasar.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  // Public website biasanya tidak perlu mengirim cookie sesi, 
  // tetapi diset 'include' jika nanti dibutuhkan rate-limiting berbasis cookie
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'omit', // Beda dengan admin yang include, public omit (lebih aman untuk cache/CDN)
  };

  try {
    const response = await fetch(url, config);

    // Parse JSON
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = data?.message || `HTTP Error ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(`[API Fetch Error] ${endpoint}:`, error.message);
    throw error;
  }
};
