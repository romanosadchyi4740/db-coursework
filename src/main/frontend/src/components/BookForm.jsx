import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAuthors } from '../services/authorService';
import { getAllPublishers } from '../services/publisherService';
import { getAllLanguages } from '../services/languageService';
import { getAllGenres } from '../services/genreService';

const BookForm = ({
  initialData,
  onSubmit,
  buttonText = 'Submit',
  loading: submitLoading = false,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      authorIds: [],
      publisherId: '',
      price: 0,
      numberInStock: 0,
      languageId: '',
      genreIds: [],
      imageUrl: '',
    }
  );

  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [formLoading, setFormLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFormLoading(true);
        const [authorsData, publishersData, languagesData, genresData] =
          await Promise.all([
            getAllAuthors(),
            getAllPublishers(),
            getAllLanguages(),
            getAllGenres(),
          ]);

        setAuthors(authorsData);
        setPublishers(publishersData);
        setLanguages(languagesData);
        setGenres(genresData);
        setFormLoading(false);
      } catch (err) {
        setError('Failed to fetch form data');
        setFormLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData({
      ...formData,
      [name]: selectedValues,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (formLoading)
    return (
      <div className="container-elegant section-padding">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bookstore-primary mx-auto mb-4"></div>
          <p className="text-bookstore-dark font-medium">
            Loading form data...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container-elegant section-padding">
        <div className="card-glass">
          <div className="flex items-start">
            <div className="text-bookstore-error text-2xl mr-3">⚠️</div>
            <div>
              <h3 className="text-lg font-semibold text-bookstore-error mb-2">
                Error Loading Form
              </h3>
              <p className="text-bookstore-secondary">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container-elegant section-padding">
      <div className="animate-fade-in">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          {/* Title Field */}
          <div className="card-glass">
            <label htmlFor="title" className="form-label flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-bookstore-accent"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8V7H5v6h10z"
                  clipRule="evenodd"
                />
              </svg>
              Book Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter the book title"
              className="form-input"
            />
          </div>

          {/* Authors Field */}
          <div className="card-glass">
            <label htmlFor="authorIds" className="form-label flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-bookstore-accent"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              Authors
            </label>
            <select
              id="authorIds"
              name="authorIds"
              multiple
              value={formData.authorIds}
              onChange={handleMultiSelectChange}
              className="form-select"
              size="5"
            >
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-bookstore-secondary mt-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-bookstore-accent"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Hold Ctrl (or Cmd) to select multiple authors
            </p>
          </div>

          {/* Publisher Field */}
          <div className="card-glass">
            <label
              htmlFor="publisherId"
              className="form-label flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-bookstore-accent"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Publisher
            </label>
            <select
              id="publisherId"
              name="publisherId"
              value={formData.publisherId}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select a publisher</option>
              {publishers.map((publisher) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.publisherName}
                </option>
              ))}
            </select>
          </div>

          {/* Price and Stock Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-glass">
              <label htmlFor="price" className="form-label flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-bookstore-accent"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
                className="form-input"
              />
            </div>

            <div className="card-glass">
              <label
                htmlFor="numberInStock"
                className="form-label flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-bookstore-accent"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Number in Stock
              </label>
              <input
                type="number"
                id="numberInStock"
                name="numberInStock"
                value={formData.numberInStock}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
                className="form-input"
              />
            </div>
          </div>

          {/* Language and Genres Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-glass">
              <label
                htmlFor="languageId"
                className="form-label flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-bookstore-accent"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"
                  />
                </svg>
                Language
              </label>
              <select
                id="languageId"
                name="languageId"
                value={formData.languageId}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select a language</option>
                {languages.map((language) => (
                  <option key={language.id} value={language.id}>
                    {language.languageName}
                  </option>
                ))}
              </select>
            </div>

            <div className="card-glass">
              <label
                htmlFor="genreIds"
                className="form-label flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-bookstore-accent"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                Genres
              </label>
              <select
                id="genreIds"
                name="genreIds"
                multiple
                value={formData.genreIds}
                onChange={handleMultiSelectChange}
                className="form-select"
                size="5"
              >
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.genreName}
                  </option>
                ))}
              </select>
              <p className="text-xs text-bookstore-secondary mt-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1 text-bookstore-accent"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Hold Ctrl (or Cmd) to select multiple genres
              </p>
            </div>
          </div>

          {/* Image URL Field */}
          <div className="card-glass">
            <label htmlFor="imageUrl" className="form-label flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-bookstore-accent"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              Image URL (Optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="form-input"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitLoading}
              className="btn-primary flex items-center justify-center"
            >
              {submitLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {buttonText}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
