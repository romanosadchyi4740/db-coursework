import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPublisherById, deletePublisher } from '../services/publisherService';
import { isAdmin } from '../services/authService';

const PublisherDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [publisher, setPublisher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublisher = async () => {
      try {
        const data = await getPublisherById(id);
        setPublisher(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch publisher details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchPublisher();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this publisher?')) {
      try {
        await deletePublisher(id);
        navigate('/publishers');
      } catch (err) {
        setError('Failed to delete publisher');
        console.error(err);
      }
    }
  };

  const userIsAdmin = isAdmin();

  if (loading) return <div className="text-center py-10 text-gray-700">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!publisher) return <div className="text-center py-10">Publisher not found</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold text-brown-600">{publisher.publisherName}</h1>
        {userIsAdmin && (
          <div className="space-x-2">
            <Link 
              to={`/publishers/edit/${publisher.id}`} 
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
        <h2 className="text-xl font-semibold mb-2 text-black">Publisher Information</h2>
        <p className="text-gray-700">
          <span className="font-semibold">Publisher Name:</span> {publisher.publisherName}
        </p>
      </div>

      <div className="flex space-x-4">
        <Link 
          to="/publishers"
          className="text-brown-600 hover:text-brown-800"
        >
          Back to Publishers
        </Link>
        <button
          onClick={() => navigate(`/books?publisherId=${publisher.id}`)}
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
        >
          View Books from this Publisher
        </button>
      </div>
    </div>
  );
};

export default PublisherDetails;
