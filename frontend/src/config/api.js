// API configuration for connecting to Django backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://althea-1.onrender.com';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for file uploads
  headers: {
    'Content-Type': 'application/json',
  }
};

// Helper function for making API requests
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Get tokens from localStorage
  const savedTokens = localStorage.getItem('authTokens');
  const tokens = savedTokens ? JSON.parse(savedTokens) : null;

  // Debug token information
  console.log('=== API REQUEST DEBUG ===');
  console.log('Endpoint:', endpoint);
  console.log('Tokens from localStorage:', tokens);
  console.log('Access token exists:', !!tokens?.access);
  if (tokens?.access) {
    console.log('Access token preview:', tokens.access.substring(0, 50) + '...');
  }

  const config = {
    credentials: 'include', // Include cookies for Django session auth
    ...options,
    headers: {
      ...apiConfig.headers,
      ...(tokens?.access && { Authorization: `Bearer ${tokens.access}` }),
      ...options.headers,
    },
  };

  console.log('Request headers:', config.headers);
  console.log('=== END API DEBUG ===');

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export default API_BASE_URL;