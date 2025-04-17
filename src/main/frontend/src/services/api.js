import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export default api;