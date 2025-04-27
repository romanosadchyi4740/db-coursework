import { fetchAll, fetchById, create, update, remove } from './api';
import api from './api';

const ENDPOINT = 'orders';

export const getAllOrders = () => fetchAll(ENDPOINT);
export const getOrderById = (id) => fetchById(ENDPOINT, id);
export const createOrder = (order) => create(ENDPOINT, order);
export const updateOrder = (id, order) => update(ENDPOINT, id, order);
export const deleteOrder = (id) => remove(ENDPOINT, id);

// Get order history for a specific customer
export const getOrderHistory = async (customerId) => {
  try {
    const response = await api.get(`/${ENDPOINT}-history?customerId=${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderHistory
};
