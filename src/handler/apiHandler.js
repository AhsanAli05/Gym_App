import axios from 'axios';

/**
 * API Handler for making HTTP requests (Axios version)
 * @param {string} method - HTTP method ('GET', 'POST', 'PATCH', 'DELETE')
 * @param {string} url - Full API endpoint URL
 * @param {string} token - Optional authentication token
 * @param {Object|FormData} data - Optional data to send
 * @param {boolean} isFormData - Whether the data is FormData
 * @returns {Promise<Object>} - Response data
 */
const apiHandler = async (
  method,
  url,
  token = null,
  data = null,
  isFormData = false,
) => {
  try {
    const config = {
      method: method.toUpperCase(),
      url,
      headers: {},
    };

    // Content-Type
    if (!isFormData) {
      config.headers['Content-Type'] = 'application/json';
    }

    // Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Body / Data
    if (
      (method === 'POST' ||
        method === 'PATCH' ||
        method === 'PUT' ||
        method === 'DELETE') &&
      data
    ) {
      config.data = data;
    }

    const response = await axios(config);

    return response.data;
  } catch (error) {
    if (error.response) {
      // Backend error
      return error.response.data;
    }
    // Network / unknown error
    throw error;
  }
};

export default apiHandler;
