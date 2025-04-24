import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { getBookById, updateBook } from '../services/bookService';

const BookEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
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
      await updateBook(id, formData);
      navigate(`/books/${id}`);
    } catch (err) {
      setError('Failed to update book');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!book) return <div className="text-center py-10">Book not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Edit Book</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <BookForm initialData={book} onSubmit={handleSubmit} buttonText="Update Book" />
    </div>
  );
};

export default BookEdit;