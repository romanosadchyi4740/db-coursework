import { fetchAll, fetchById, create, update, remove } from './api';

const ENDPOINT = 'publishers';

export const getAllPublishers = () => fetchAll(ENDPOINT);
export const getPublisherById = (id) => fetchById(ENDPOINT, id);
export const createPublisher = (publisher) => create(ENDPOINT, publisher);
export const updatePublisher = (id, publisher) => update(ENDPOINT, id, publisher);
export const deletePublisher = (id) => remove(ENDPOINT, id);

export default {
  getAllPublishers,
  getPublisherById,
  createPublisher,
  updatePublisher,
  deletePublisher
};