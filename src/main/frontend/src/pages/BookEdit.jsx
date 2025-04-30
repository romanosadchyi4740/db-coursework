import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { getBookById, updateBook } from '../services/bookService';

const BookEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id);

        // Transform the data to match the form structure
        const formData = {
          ...data,
          authorIds: data.authorIds || [], // Ensure authorIds is an array
          genreIds: data.genreIds || []    // Ensure genreIds is an array
        };

        setBook(formData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch book details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setFormLoading(true);
      await updateBook(id, formData);
      navigate(`/books/${id}`);
    } catch (err) {
      setError('Failed to update book');
      console.error(err);
      setFormLoading(false);
    }
  };

  if (loading) return (
    <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-lg max-w-6xl mx-auto text-center py-10">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mr-3"></div>
        <p className="text-lg text-gray-700">Loading book details...</p>
      </div>
    </div>
  );

  if (!book) return (
    <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-lg max-w-6xl mx-auto text-center py-10">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      <p className="text-xl font-medium text-gray-700">Book not found</p>
      <Link 
        to="/books" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mt-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Books
      </Link>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-lg max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b border-blue-100 pb-4">
        <h1 className="text-3xl font-bold text-blue-700 drop-shadow-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Book: {book.title}
        </h1>
        <div className="flex space-x-3">
          <Link 
            to={`/books/${id}`} 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            View Book
          </Link>
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
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-red-700">{error}</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-md">
        <BookForm initialData={book} onSubmit={handleSubmit} buttonText="Update Book" loading={formLoading} />
      </div>
    </div>
  );
};

export default BookEdit;
