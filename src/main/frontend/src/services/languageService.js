import { fetchAll, fetchById, create, update, remove } from './api';

const ENDPOINT = 'languages';

export const getAllLanguages = () => fetchAll(ENDPOINT);
export const getLanguageById = (id) => fetchById(ENDPOINT, id);
export const createLanguage = (language) => create(ENDPOINT, language);
export const updateLanguage = (id, language) => update(ENDPOINT, id, language);
export const deleteLanguage = (id) => remove(ENDPOINT, id);

export default {
  getAllLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage
};