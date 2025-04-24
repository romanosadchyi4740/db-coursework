import axios from 'axios';

const AUTH_URL = '/auth';

const api = axios.create({
  baseURL: AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register a new user
export const signUp = async (userData) => {
  try {
    const response = await api.post('/sign-up', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    }
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

// Login a user
export const signIn = async (credentials) => {
  try {
    const response = await api.post('/sign-in', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    }
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

// Logout a user
export const signOut = () => {
  localStorage.removeItem('token');
};

// Get current user token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Decode JWT token
export const decodeToken = (token) => {
  if (!token) return null;
  try {
    // JWT tokens are split into three parts: header, payload, and signature
    // We need the payload part which is the second part
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Get user role from token
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  const decodedToken = decodeToken(token);
  return decodedToken?.role || null;
};

// Check if user is admin
export const isAdmin = () => {
  const role = getUserRole();
  return role === 'ROLE_ADMIN';
};

export default {
  signUp,
  signIn,
  signOut,
  getToken,
  isAuthenticated,
  decodeToken,
  getUserRole,
  isAdmin
};
