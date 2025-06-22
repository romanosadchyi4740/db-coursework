import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorForm from '../components/AuthorForm';
import { createAuthor } from '../services/authorService';

const AuthorCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      await createAuthor(formData);
      navigate('/authors');
    } catch (err) {
      setError('Failed to create author');
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-brown-600 mb-6">Create New Author</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <AuthorForm onSubmit={handleSubmit} buttonText="Create Author" />
    </div>
  );
};

export default AuthorCreate;