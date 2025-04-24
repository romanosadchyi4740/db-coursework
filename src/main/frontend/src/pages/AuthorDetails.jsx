import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getAuthorById, deleteAuthor } from '../services/authorService';
import { isAdmin } from '../services/authService';

const AuthorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await getAuthorById(id);
        setAuthor(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch author details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchAuthor();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        await deleteAuthor(id);
        navigate('/authors');
      } catch (err) {
        setError('Failed to delete author');
        console.error(err);
      }
    }
  };

  const userIsAdmin = isAdmin();

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!author) return <div className="text-center py-10">Author not found</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold text-blue-600">{author.name}</h1>
        {userIsAdmin && (
          <div className="space-x-2">
            <Link 
              to={`/authors/edit/${author.id}`} 
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
        <h2 className="text-xl font-semibold mb-2 text-black">Author Information</h2>
        <p className="text-gray-700">
          <span className="font-semibold">Author's Name:</span> {author.name}
        </p>
      </div>

      <Link 
        to="/authors"
        className="text-blue-600 hover:text-blue-800"
      >
        Back to Authors
      </Link>
    </div>
  );
};

export default AuthorDetails;
