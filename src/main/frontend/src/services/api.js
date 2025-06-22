import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://18.193.48.5:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 403 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      console.error('Access forbidden. Redirecting to login page.');
      // Clear token if it exists
      localStorage.removeItem('token');
      // Dispatch auth-change event to update navbar
      window.dispatchEvent(new Event('auth-change'));
      // Redirect to login page
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

export const fetchAll = async (endpoint) => {
  try {
    const response = await api.get(`/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const fetchById = async (endpoint, id) => {
  try {
    const response = await api.get(`/${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint} with id ${id}:`, error);
    throw error;
  }
};

export const create = async (endpoint, data) => {
  try {
    const response = await api.post(`/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error creating ${endpoint}:`, error);
    throw error;
  }
};

export const update = async (endpoint, id, data) => {
  try {
    const response = await api.put(`/${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating ${endpoint} with id ${id}:`, error);
    throw error;
  }
};

export const remove = async (endpoint, id) => {
  try {
    await api.delete(`/${endpoint}/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting ${endpoint} with id ${id}:`, error);
    throw error;
  }
};

export const downloadFile = async (endpoint, filename = 'downloaded-file') => {
  try {
    const response = await api.get(`/${endpoint}`, {
      responseType: 'blob', // important for binary file
    });

    // Create a blob URL
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); // set filename for download
    document.body.appendChild(link);
    link.click();

    // Clean up
    link.remove();
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error(`Error downloading ${endpoint}:`, error);
    throw error;
  }
};

export default api;
