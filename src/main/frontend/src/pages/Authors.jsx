import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllAuthors, deleteAuthor } from '../services/authorService';
import { isAdmin } from '../services/authService';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        const data = await getAllAuthors();
        setAuthors(data);
      } catch (err) {
        setError('Failed to fetch authors');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        await deleteAuthor(id);
        setAuthors(authors.filter(author => author.id !== id));
      } catch (err) {
        setError('Failed to delete author');
        console.error(err);
      }
    }
  };

  const userIsAdmin = isAdmin();

  if (loading) return <div className="text-center py-10 text-gray-700">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Authors</h1>
        {userIsAdmin && (
          <Link 
            to="/authors/new" 
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add New Author
          </Link>
        )}
      </div>

      {authors.length === 0 ? (
        <p className="text-center py-10">No authors found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map(author => (
            <div key={author.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-black">{author.name}</h2>
              <div className="flex justify-between">
                <Link 
                  to={`/authors/${author.id}`} 
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Details
                </Link>
                {userIsAdmin && (
                  <div className="space-x-2">
                    <Link 
                      to={`/authors/edit/${author.id}`} 
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(author.id)} 
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Authors;
