import { fetchAll, fetchById, create, update, remove } from './api';

const ENDPOINT = 'reviews';

export const getAllReviews = () => fetchAll(ENDPOINT);
export const getReviewById = (id) => fetchById(ENDPOINT, id);
export const createReview = (review) => create(ENDPOINT, review);
export const updateReview = (id, review) => update(ENDPOINT, id, review);
export const deleteReview = (id) => remove(ENDPOINT, id);

export default {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};