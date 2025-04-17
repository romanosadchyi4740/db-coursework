import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks, deleteBook } from '../services/bookService';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch books');
        setLoading(false);
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        setBooks(books.filter(book => book.id !== id));
      } catch (err) {
        setError('Failed to delete book');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Books</h1>
        <Link 
          to="/books/new" 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Book
        </Link>
      </div>

      {books.length === 0 ? (
        <p className="text-center py-10">No books found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => (
            <div key={book.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Authors:</span> {book.authorNames.join(', ')}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Publisher:</span> {book.publisher}
              </p>
              <div className="flex justify-between">
                <Link 
                  to={`/books/${book.id}`} 
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Details
                </Link>
                <div className="space-x-2">
                  <Link 
                    to={`/books/edit/${book.id}`} 
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(book.id)} 
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;