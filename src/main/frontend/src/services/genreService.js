import { fetchAll, fetchById, create, update, remove } from './api';

const ENDPOINT = 'genres';

export const getAllGenres = () => fetchAll(ENDPOINT);
export const getGenreById = (id) => fetchById(ENDPOINT, id);
export const createGenre = (genre) => create(ENDPOINT, genre);
export const updateGenre = (id, genre) => update(ENDPOINT, id, genre);
export const deleteGenre = (id) => remove(ENDPOINT, id);

export default {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre
};