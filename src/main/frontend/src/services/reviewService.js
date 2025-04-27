import { fetchAll, fetchById, create, update, remove } from './api';
import api from './api';

const ENDPOINT = 'reviews';

export const getAllReviews = () => fetchAll(ENDPOINT);
export const getReviewById = (id) => fetchById(ENDPOINT, id);
export const createReview = (review) => create(ENDPOINT, review);
export const updateReview = (id, review) => update(ENDPOINT, id, review);
export const deleteReview = (id) => remove(ENDPOINT, id);

// Get reviews by their IDs
export const getReviewsByIds = async (reviewIds) => {
  try {
    // If there are no review IDs, return an empty array
    if (!reviewIds || reviewIds.length === 0) {
      return [];
    }

    // Fetch each review by its ID
    const reviewPromises = reviewIds.map(id => getReviewById(id));
    const reviews = await Promise.all(reviewPromises);
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews by IDs:', error);
    throw error;
  }
};

export default {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByIds
};
