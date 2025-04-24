import {fetchAll, fetchById, create, update, remove, downloadFile} from './api';
import api from './api';

const ENDPOINT = 'books';

export const getAllBooks = () => fetchAll(`${ENDPOINT}/all`);
export const downloadBooks = () => downloadFile(`${ENDPOINT}/download`, "books.csv");
export const getBookById = (id) => fetchById(ENDPOINT, id);
export const createBook = (book) => create(ENDPOINT, book);
export const updateBook = (id, book) => update(ENDPOINT, id, book);
export const deleteBook = (id) => remove(ENDPOINT, id);

// Get paginated books
export const getPaginatedBooks = async (pageNo = 0, pageSize = 10) => {
  try {
    const response = await api.get(`/${ENDPOINT}?pageNo=${pageNo}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching paginated ${ENDPOINT}:`, error);
    throw error;
  }
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getPaginatedBooks
};
