import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBookById, deleteBook } from '../services/bookService';
import { isAdmin } from '../services/authService';
import { useCart } from '../context/CartContext';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const userIsAdmin = isAdmin();

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!book) return <div className="text-center py-10">Book not found</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
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
