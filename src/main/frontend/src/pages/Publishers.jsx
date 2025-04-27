import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPublishers, deletePublisher } from '../services/publisherService.js';
import { isAdmin } from '../services/authService';

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        setLoading(true);
        const data = await getAllPublishers ();
        setPublishers(data);
      } catch (err) {
        setError('Failed to fetch publishers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this publisher?')) {
      try {
        await deletePublisher(id);
        setPublishers(publishers.filter(publisher => publisher.id !== id));
      } catch (err) {
        setError('Failed to delete publisher');
        console.error(err);
      }
    }
  };

  const userIsAdmin = isAdmin();

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Publishers</h1>
        {userIsAdmin && (
          <Link
            to="/publishers/new"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add New Publisher
          </Link>
        )}
      </div>

      {publishers.length === 0 ? (
        <p className="text-center py-10">No publishers found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishers.map(publisher => (
            <div key={publisher.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-black">{publisher.publisherName}</h2>
              <div className="flex justify-between">
                <Link
                  to={`/publishers/${publisher.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Details
                </Link>
                {userIsAdmin && (
                  <div className="space-x-2">
                    <Link
                      to={`/publishers/edit/${publisher.id}`}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(publisher.id)}
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

export default Publishers;
