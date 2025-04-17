import { fetchAll, fetchById, create, update, remove } from './api';

const ENDPOINT = 'authors';

export const getAllAuthors = () => fetchAll(ENDPOINT);
export const getAuthorById = (id) => fetchById(ENDPOINT, id);
export const createAuthor = (author) => create(ENDPOINT, author);
export const updateAuthor = (id, author) => update(ENDPOINT, id, author);
export const deleteAuthor = (id) => remove(ENDPOINT, id);

export default {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};