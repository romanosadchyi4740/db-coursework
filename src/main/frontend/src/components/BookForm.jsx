import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAuthors } from '../services/authorService';
import { getAllPublishers } from '../services/publisherService';
import { getAllLanguages } from '../services/languageService';
import { getAllGenres } from '../services/genreService';

const BookForm = ({ initialData, onSubmit, buttonText = 'Submit' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData || {
    title: '',
    authorIds: [],
    publisherId: '',
    price: 0,
    numberInStock: 0,
    languageId: '',
    genreIds: [],
    imageUrl: ''
  });

  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [authorsData, publishersData, languagesData, genresData] = await Promise.all([
          getAllAuthors(),
          getAllPublishers(),
          getAllLanguages(),
          getAllGenres()
        ]);

        setAuthors(authorsData);
        setPublishers(publishersData);
        setLanguages(languagesData);
        setGenres(genresData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch form data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);

    setFormData({
      ...formData,
      [name]: selectedValues
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="authorIds" className="block text-sm font-medium text-gray-700">
          Authors
        </label>
        <select
          id="authorIds"
          name="authorIds"
          multiple
          value={formData.authorIds}
          onChange={handleMultiSelectChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Hold Ctrl (or Cmd) to select multiple authors</p>
      </div>

      <div>
        <label htmlFor="publisherId" className="block text-sm font-medium text-gray-700">
          Publisher
        </label>
        <select
          id="publisherId"
          name="publisherId"
          value={formData.publisherId}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a publisher</option>
          {publishers.map(publisher => (
            <option key={publisher.id} value={publisher.id}>
              {publisher.publisherName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="numberInStock" className="block text-sm font-medium text-gray-700">
          Number in Stock
        </label>
        <input
          type="number"
          id="numberInStock"
          name="numberInStock"
          value={formData.numberInStock}
          onChange={handleChange}
          min="0"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label htmlFor="languageId" className="block text-sm font-medium text-gray-700">
          Language
        </label>
        <select
          id="languageId"
          name="languageId"
          value={formData.languageId}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a language</option>
          {languages.map(language => (
            <option key={language.id} value={language.id}>
              {language.language}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="genreIds" className="block text-sm font-medium text-gray-700">
          Genres
        </label>
        <select
          id="genreIds"
          name="genreIds"
          multiple
          value={formData.genreIds}
          onChange={handleMultiSelectChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.genreName}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Hold Ctrl (or Cmd) to select multiple genres</p>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate('/books')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
