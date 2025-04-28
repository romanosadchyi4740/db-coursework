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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!book) return <div className="text-center py-10">Book not found</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <img
        className="w-[100px] h-[100px] object-cover rounded-lg"
        src={book.imageUrl !== null ? book.imageUrl : "default-book-icon.png"}
        alt=""
      />
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold text-blue-600">{book.title}</h1>
        {userIsAdmin && (
          <div className="space-x-2">
            <Link 
              to={`/books/edit/${book.id}`} 
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
              Edit
            </Link>
            <button 
              onClick={handleDelete} 
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Authors</h2>
        <p className="text-gray-700">{book.authorNames.join(', ')}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Publisher</h2>
        <p className="text-gray-700">{book.publisher}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Price</h2>
        <p className="text-gray-700">${book.price.toFixed(2)}</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => addToCart({
            id: book.id,
            title: book.title,
            price: book.price,
            quantity: 1
          })}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
        <Link 
          to="/cart" 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View Cart
        </Link>
      </div>

      {/* Reviews Section */}
      <div className="mt-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Reviews</h2>

        {reviewsLoading ? (
          <p className="text-gray-500">Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="border-b pb-4">
                <p className="text-gray-700 mb-2">{review.text}</p>
                <p className="text-sm text-gray-500">By: {review.reviewerName}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Review Form */}
      {userIsAuthenticated ? (
        <div className="mt-6 mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Leave a Review</h3>
          {reviewError && (
            <p className="text-red-500 mb-3">{reviewError}</p>
          )}
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Write your review here..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={reviewSubmitting}
              className={`px-4 py-2 rounded ${
                reviewSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-6 mb-8 p-4 bg-gray-100 rounded-md">
          <p className="text-gray-700">
            Please <Link to="/sign-in" className="text-blue-600 hover:text-blue-800">log in</Link> to leave a review.
          </p>
        </div>
      )}

      <Link 
        to="/books" 
        className="text-blue-600 hover:text-blue-800"
      >
        Back to Books
      </Link>
    </div>
  );
};

export default BookDetails;
