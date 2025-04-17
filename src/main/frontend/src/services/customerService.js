import { fetchAll, fetchById, create, update, remove } from './api';

const ENDPOINT = 'customers';

export const getAllCustomers = () => fetchAll(ENDPOINT);
export const getCustomerById = (id) => fetchById(ENDPOINT, id);
export const createCustomer = (customer) => create(ENDPOINT, customer);
export const updateCustomer = (id, customer) => update(ENDPOINT, id, customer);
export const deleteCustomer = (id) => remove(ENDPOINT, id);

export default {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};