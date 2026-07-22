const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchApi(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    // SANGAT PENTING: credentials include agar HttpOnly Cookie terkirim secara otomatis
    credentials: 'include',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // Jika body bukan JSON stringify dan merupakan FormData, hapus Content-Type agar browser set boundary secara otomatis
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Jika menerima 401 Unauthorized, kirimkan event global untuk penanganan sesi terputus
      if (response.status === 401 && !url.includes('/api/auth/login')) {
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
      
      const error = new Error(data.message || `HTTP error! Status: ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}
