import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBookById, deleteBook } from '../services/bookService';
import { getReviewsByIds, createReview } from '../services/reviewService';
import { isAdmin, isAuthenticated, getUserId, getUsername } from '../services/authService';
import { useCart } from '../context/CartContext';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch book details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchBook();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (book && book.reviewIds && book.reviewIds.length > 0) {
        setReviewsLoading(true);
        try {
          const reviewsData = await getReviewsByIds(book.reviewIds);
          setReviews(reviewsData);
          setReviewsLoading(false);
        } catch (err) {
          console.error('Failed to fetch reviews:', err);
          setReviewsLoading(false);
        }
      }
    };

    fetchReviews();
  }, [book]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        navigate('/books');
      } catch (err) {
        setError('Failed to delete book');
        console.error(err);
      }
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setReviewSubmitting(true);
    setReviewError(null);

    try {
      const userId = getUserId();
      const username = getUsername();

      if (!userId) {
        setReviewError('You must be logged in to submit a review');
        setReviewSubmitting(false);
        return;
      }

      const newReview = {
        text: reviewText,
        reviewerId: userId,
        reviewerName: username,
        bookId: parseInt(id)
      };

      const createdReview = await createReview(newReview);
      setReviews([...reviews, createdReview]);
      setReviewText('');
      setReviewSubmitting(false);

      // Refresh the book data to get the updated reviewIds
      const updatedBook = await getBookById(id);
      setBook(updatedBook);
    } catch (err) {
      setReviewError('Failed to submit review');
      setReviewSubmitting(false);
      console.error(err);
    }
  };

  const userIsAdmin = isAdmin();
  const userIsAuthenticated = isAuthenticated();

  if (loading) return <div className="text-center py-10 text-gray-700">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!book) return <div className="text-center py-10">Book not found</div>;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-lg max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Book Image - Left Column */}
        <div className="md:col-span-1 flex justify-center">
          <div className="relative">
            <img
              className="w-full max-w-[300px] h-auto object-cover rounded-lg shadow-md border-4 border-white hover:scale-105 transition-transform duration-300"
              src={book.imageUrl !== null ? book.imageUrl : "default-book-icon.png"}
              alt={book.title}
            />
            <div className="absolute -bottom-3 -right-3 bg-yellow-400 text-gray-800 font-bold py-1 px-3 rounded-full shadow-md transform rotate-12">
              ${book.price.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Book Details - Right Column */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl font-bold text-blue-700 drop-shadow-sm">{book.title}</h1>
            {userIsAdmin && (
              <div className="space-x-2">
                <Link 
                  to={`/books/edit/${book.id}`} 
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors shadow-md"
                >
                  Edit
                </Link>
                <button 
                  onClick={handleDelete} 
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Authors
              </h2>
              <p className="text-gray-700 font-medium">{book.authorNames.join(', ')}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8V7H5v6h10z" clipRule="evenodd" />
                </svg>
                Publisher
              </h2>
              <p className="text-gray-700 font-medium">{book.publisher}</p>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => addToCart({
                id: book.id,
                title: book.title,
                price: book.price,
                quantity: 1
              })}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Add to Cart
            </button>
            <Link 
              to="/cart" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              View Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center border-b pb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Reviews
        </h2>

        {reviewsLoading ? (
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="ml-2 text-gray-500">Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p className="text-gray-700 mb-3 italic">{review.text}</p>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    {review.reviewerName.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-sm font-medium text-gray-600">By: {review.reviewerName}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>

      {/* Review Form */}
      {userIsAuthenticated ? (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center border-b pb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
            </svg>
            Leave a Review
          </h3>
          {reviewError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
              <p className="text-red-700">{reviewError}</p>
            </div>
          )}
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                rows="4"
                placeholder="Share your thoughts about this book..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={reviewSubmitting}
              className={`px-6 py-3 rounded-lg shadow-md flex items-center ${
                reviewSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white transition-colors'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-blue-50 p-6 rounded-xl shadow-md mb-8 border border-blue-100">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 mr-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-gray-700 font-medium">
              Please <Link to="/sign-in" className="text-blue-600 hover:text-blue-800 underline">log in</Link> to leave a review.
            </p>
          </div>
        </div>
      )}

      <Link 
        to="/books" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Books
      </Link>
    </div>
  );
};

export default BookDetails;
