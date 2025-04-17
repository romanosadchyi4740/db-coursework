import { fetchAll, fetchById, create, update, remove } from './api';

const ENDPOINT = 'books';

export const getAllBooks = () => fetchAll(ENDPOINT);
export const getBookById = (id) => fetchById(ENDPOINT, id);
export const createBook = (book) => create(ENDPOINT, book);
export const updateBook = (id, book) => update(ENDPOINT, id, book);
export const deleteBook = (id) => remove(ENDPOINT, id);

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};