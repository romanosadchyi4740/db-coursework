import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthorForm from '../components/AuthorForm';
import { getAuthorById, updateAuthor } from '../services/authorService';

const AuthorEdit = () => {
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

  const handleSubmit = async (formData) => {
    try {
      await updateAuthor(id, formData);
      navigate(`/authors/${id}`);
    } catch (err) {
      setError('Failed to update author');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!author) return <div className="text-center py-10">Author not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Edit Author</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <AuthorForm initialData={author} onSubmit={handleSubmit} buttonText="Update Author" />
    </div>
  );
};

export default AuthorEdit;