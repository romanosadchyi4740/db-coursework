import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { createBook } from '../services/bookService';

const BookCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      console.log(formData);
      await createBook(formData);
      navigate('/books');
    } catch (err) {
      setError('Failed to create book');
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Create New Book</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <BookForm onSubmit={handleSubmit} buttonText="Create Book" />
    </div>
  );
};

export default BookCreate;