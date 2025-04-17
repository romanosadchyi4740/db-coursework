import { fetchAll, fetchById, create, update, remove } from './api';

const ENDPOINT = 'orders';

export const getAllOrders = () => fetchAll(ENDPOINT);
export const getOrderById = (id) => fetchById(ENDPOINT, id);
export const createOrder = (order) => create(ENDPOINT, order);
export const updateOrder = (id, order) => update(ENDPOINT, id, order);
export const deleteOrder = (id) => remove(ENDPOINT, id);

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};