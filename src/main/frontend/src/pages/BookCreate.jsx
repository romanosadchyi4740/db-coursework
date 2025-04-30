import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { createBook } from '../services/bookService';

const BookCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      console.log(formData);
      await createBook(formData);
      navigate('/books');
    } catch (err) {
      setError('Failed to create book');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-lg max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b border-blue-100 pb-4">
        <h1 className="text-3xl font-bold text-blue-700 drop-shadow-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          Create New Book
        </h1>
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

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-red-700">{error}</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-md">
        <BookForm onSubmit={handleSubmit} buttonText="Create Book" loading={loading} />
      </div>
    </div>
  );
};

export default BookCreate;
