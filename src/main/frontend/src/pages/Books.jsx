import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  getPaginatedBooks,
  deleteBook,
  downloadBooks,
  getBooksByGenre,
  getBooksByAuthor,
  getBooksByPublisher,
  getBooksByTitle,
  getFilteredBooks,
} from '../services/bookService';
import { getAllGenres } from '../services/genreService';
import { getAllAuthors } from '../services/authorService';
import { getAllPublishers } from '../services/publisherService';
import { isAdmin } from '../services/authService';
import { useCart } from '../context/CartContext';

const Books = () => {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const { addToCart } = useCart();

  // Filter states
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [searchTitle, setSearchTitle] = useState('');

  // Fetch filter options (genres, authors, publishers)
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [genresData, authorsData, publishersData] = await Promise.all([
          getAllGenres(),
          getAllAuthors(),
          getAllPublishers(),
        ]);
        setGenres(genresData);
        setAuthors(authorsData);
        setPublishers(publishersData);

        // Check URL parameters for pre-selected filters after options are loaded
        const authorId = searchParams.get('authorId');
        const publisherId = searchParams.get('publisherId');
        const genreId = searchParams.get('genreId');
        const title = searchParams.get('title');

        if (authorId) setSelectedAuthor(authorId);
        if (publisherId) setSelectedPublisher(publisherId);
        if (genreId) setSelectedGenre(genreId);
        if (title) {
          setInputTitle(title);
          setSearchTitle(title);
        }
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
      }
    };

    fetchFilterOptions();
  }, [searchParams]);

  // Fetch books based on active filters
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let data;

        // Check if any filters are active
        const hasActiveFilters =
          selectedGenre || selectedAuthor || selectedPublisher || searchTitle;

        if (hasActiveFilters) {
          // Use the new multi-filter endpoint
          const filters = {
            genreId: selectedGenre || null,
            authorId: selectedAuthor || null,
            publisherId: selectedPublisher || null,
            title: searchTitle || null,
          };
          data = await getFilteredBooks(filters, currentPage, pageSize);
        } else {
          // No filters, get all books
          data = await getPaginatedBooks(currentPage, pageSize);
        }

        setBooks(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch books');
        setLoading(false);
        console.error(err);
      }
    };

    fetchBooks();
  }, [
    currentPage,
    pageSize,
    selectedGenre,
    selectedAuthor,
    selectedPublisher,
    searchTitle,
  ]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        setBooks(books.filter((book) => book.id !== id));
      } catch (err) {
        setError('Failed to delete book');
        console.error(err);
      }
    }
  };

  const handleDownload = async () => {
    try {
      await downloadBooks();
      console.log('Books downloaded successfully');
    } catch (err) {
      setError('Failed to download books');
      console.error(err);
    }
  };

  // Handle filter changes
  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);
    setCurrentPage(0);
  };

  const handleAuthorChange = (e) => {
    const authorId = e.target.value;
    setSelectedAuthor(authorId);
    setCurrentPage(0);
  };

  const handlePublisherChange = (e) => {
    const publisherId = e.target.value;
    setSelectedPublisher(publisherId);
    setCurrentPage(0);
  };

  const handleTitleSearch = (e) => {
    const title = e.target.value;
    setInputTitle(title);
  };

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    setSearchTitle(inputTitle);
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setSelectedGenre('');
    setSelectedAuthor('');
    setSelectedPublisher('');
    setInputTitle('');
    setSearchTitle('');
    setCurrentPage(0);
  };

  if (loading)
    return (
      <div className="container-elegant section-padding">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bookstore-primary mx-auto mb-4"></div>
          <p className="text-bookstore-dark font-medium">Loading books...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container-elegant section-padding">
        <div className="text-center">
          <div className="text-bookstore-error text-6xl mb-4">⚠️</div>
          <p className="text-bookstore-error font-medium text-lg">{error}</p>
        </div>
      </div>
    );

  const userIsAdmin = isAdmin();

  return (
    <div className="container-elegant section-padding">
      <div className="animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient font-serif mb-2">
              Books Collection
            </h1>
            <p className="text-bookstore-secondary text-lg">
              Discover {totalElements} carefully curated books
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleDownload()}
              className="btn-secondary flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Download
            </button>
            {userIsAdmin && (
              <Link to="/books/new" className="btn-success flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Book
              </Link>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="card-glass mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gradient font-serif flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-3 text-bookstore-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            Filter & Search
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label htmlFor="title-search" className="form-label">
                Search by Title
              </label>
              <form onSubmit={handleTitleSubmit} className="flex">
                <input
                  type="text"
                  id="title-search"
                  value={inputTitle}
                  onChange={handleTitleSearch}
                  placeholder="Enter book title..."
                  className="form-input rounded-r-none"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-bookstore-primary to-bookstore-secondary text-white px-4 py-3 rounded-r-lg hover:from-bookstore-secondary hover:to-bookstore-accent transition-all duration-200 shadow-book flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            </div>

            <div>
              <label htmlFor="genre-filter" className="form-label">
                Genre
              </label>
              <select
                id="genre-filter"
                value={selectedGenre}
                onChange={handleGenreChange}
                className="form-select"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.genreName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="author-filter" className="form-label">
                Author
              </label>
              <select
                id="author-filter"
                value={selectedAuthor}
                onChange={handleAuthorChange}
                className="form-select"
              >
                <option value="">All Authors</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="publisher-filter" className="form-label">
                Publisher
              </label>
              <select
                id="publisher-filter"
                value={selectedPublisher}
                onChange={handlePublisherChange}
                className="form-select"
              >
                <option value="">All Publishers</option>
                {publishers.map((publisher) => (
                  <option key={publisher.id} value={publisher.id}>
                    {publisher.publisherName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(selectedGenre ||
            selectedAuthor ||
            selectedPublisher ||
            searchTitle) && (
            <div className="mt-6 pt-6 border-t border-bookstore-accent">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {searchTitle && (
                    <span className="badge badge-primary">
                      Title: {searchTitle}
                      <button
                        onClick={() => setSearchTitle('')}
                        className="ml-2 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedGenre && (
                    <span className="badge badge-secondary">
                      Genre:{' '}
                      {genres.find((g) => g.id == selectedGenre)?.genreName ||
                        selectedGenre}
                      <button
                        onClick={() => setSelectedGenre('')}
                        className="ml-2 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedAuthor && (
                    <span className="badge badge-accent">
                      Author:{' '}
                      {authors.find((a) => a.id == selectedAuthor)?.name ||
                        selectedAuthor}
                      <button
                        onClick={() => setSelectedAuthor('')}
                        className="ml-2 hover:text-bookstore-dark"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedPublisher && (
                    <span className="badge badge-warning">
                      Publisher:{' '}
                      {publishers.find((p) => p.id == selectedPublisher)
                        ?.publisherName || selectedPublisher}
                      <button
                        onClick={() => setSelectedPublisher('')}
                        className="ml-2 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
                <button
                  onClick={clearFilters}
                  className="btn-danger flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="card-glass text-center py-16">
            <div className="text-bookstore-accent text-8xl mb-6">📚</div>
            <h3 className="text-2xl font-semibold mb-4 text-gradient font-serif">
              No books found
            </h3>
            <p className="text-bookstore-secondary text-lg mb-6">
              Try adjusting your filters or search terms
            </p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <div key={book.id} className="book-card group animate-slide-up">
                  <div className="relative overflow-hidden">
                    <img
                      className="book-cover"
                      src={
                        book.imageUrl !== null
                          ? book.imageUrl
                          : 'default-book-icon.png'
                      }
                      alt={book.title}
                    />
                    <div className="absolute top-3 right-3">
                      <div className="bg-gradient-to-r from-bookstore-gold to-bookstore-copper text-white font-bold py-2 px-3 rounded-full shadow-lg text-sm">
                        ${book.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-bookstore-primary line-clamp-2 font-serif group-hover:text-bookstore-secondary transition-colors">
                      {book.title}
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-bookstore-accent mt-0.5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <div>
                          <span className="text-sm font-medium text-bookstore-secondary">
                            Authors:
                          </span>
                          <p className="text-sm text-bookstore-dark line-clamp-2">
                            {book.authorNames.join(', ')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-bookstore-accent mt-0.5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8V7H5v6h10z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <span className="text-sm font-medium text-bookstore-secondary">
                            Publisher:
                          </span>
                          <p className="text-sm text-bookstore-dark">
                            {book.publisher}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() =>
                          addToCart({
                            id: book.id,
                            title: book.title,
                            price: book.price,
                            quantity: 1,
                          })
                        }
                        className="btn-primary w-full flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        Add to Cart
                      </button>

                      <div className="flex justify-between items-center">
                        <Link
                          to={`/books/${book.id}`}
                          className="text-bookstore-primary hover:text-bookstore-accent font-medium flex items-center text-sm"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Details
                        </Link>
                        {userIsAdmin && (
                          <div className="flex space-x-3">
                            <Link
                              to={`/books/edit/${book.id}`}
                              className="text-bookstore-accent hover:text-bookstore-secondary font-medium flex items-center text-sm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(book.id)}
                              className="text-bookstore-error hover:text-red-800 font-medium flex items-center text-sm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="card-glass mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-bookstore-secondary mb-4 md:mb-0">
                  <span className="font-medium">Showing</span> {books.length}{' '}
                  <span className="font-medium">of</span> {totalElements}{' '}
                  <span className="font-medium font-serif">books</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(0, prev - 1))
                    }
                    disabled={currentPage === 0}
                    className={`px-4 py-2 rounded-lg flex items-center transition-all ${
                      currentPage === 0
                        ? 'bg-gradient-to-r from-bookstore-primary to-bookstore-secondary text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-bookstore-primary to-bookstore-secondary text-white hover:from-bookstore-secondary hover:to-bookstore-accent shadow-book hover:shadow-book-hover transform hover:scale-105'
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Previous
                  </button>

                  <div className="flex flex-wrap items-center gap-1">
                    {(() => {
                      const pageButtons = [];
                      let startPage, endPage;

                      if (totalPages <= 10) {
                        startPage = 0;
                        endPage = totalPages - 1;
                      } else {
                        if (currentPage < 5) {
                          startPage = 0;
                          endPage = 9;
                        } else if (currentPage >= totalPages - 5) {
                          startPage = totalPages - 10;
                          endPage = totalPages - 1;
                        } else {
                          startPage = currentPage - 4;
                          endPage = currentPage + 5;
                        }
                      }

                      for (let i = startPage; i <= endPage; i++) {
                        pageButtons.push(
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                              currentPage === i
                                ? 'bg-gradient-to-r from-bookstore-primary to-bookstore-secondary text-white shadow-book'
                                : 'bg-bookstore-lighter text-bookstore-dark hover:bg-bookstore-light hover:shadow-elegant'
                            }`}
                          >
                            {i + 1}
                          </button>
                        );
                      }

                      return pageButtons;
                    })()}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(totalPages - 1, prev + 1)
                      )
                    }
                    disabled={currentPage === totalPages - 1}
                    className={`px-4 py-2 rounded-lg flex items-center transition-all ${
                      currentPage === totalPages - 1
                        ? 'bg-gradient-to-r from-bookstore-primary to-bookstore-secondary text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-bookstore-primary to-bookstore-secondary text-white hover:from-bookstore-secondary hover:to-bookstore-accent shadow-book hover:shadow-book-hover transform hover:scale-105'
                    }`}
                  >
                    Next
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Books;
