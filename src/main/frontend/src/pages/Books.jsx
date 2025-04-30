import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getPaginatedBooks, 
  deleteBook, 
  downloadBooks, 
  getBooksByGenre, 
  getBooksByAuthor, 
  getBooksByPublisher,
  getBooksByTitle,
  getFilteredBooks
} from '../services/bookService';
import { getAllGenres } from '../services/genreService';
import { getAllAuthors } from '../services/authorService';
import { getAllPublishers } from '../services/publisherService';
import { isAdmin } from '../services/authService';
import { useCart } from '../context/CartContext';

const Books = () => {
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
  // No longer need activeFilter state since we're using multiple filters

  // Fetch filter options (genres, authors, publishers)
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [genresData, authorsData, publishersData] = await Promise.all([
          getAllGenres(),
          getAllAuthors(),
          getAllPublishers()
        ]);
        setGenres(genresData);
        setAuthors(authorsData);
        setPublishers(publishersData);
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
      }
    };

    fetchFilterOptions();
  }, []);

  // Fetch books based on active filters
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let data;

        // Check if any filters are active
        const hasActiveFilters = selectedGenre || selectedAuthor || selectedPublisher || searchTitle;

        if (hasActiveFilters) {
          // Use the new multi-filter endpoint
          const filters = {
            genreId: selectedGenre || null,
            authorId: selectedAuthor || null,
            publisherId: selectedPublisher || null,
            title: searchTitle || null
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
  }, [currentPage, pageSize, selectedGenre, selectedAuthor, selectedPublisher, searchTitle]);

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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  const userIsAdmin = isAdmin();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-xl shadow-lg max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-blue-100 pb-4">
        <h1 className="text-4xl font-bold text-blue-700 drop-shadow-sm mb-4 md:mb-0">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Books Collection
          </span>
        </h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => handleDownload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Books
          </button>
          {userIsAdmin && (
            <Link 
              to="/books/new" 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add New Book
            </Link>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-md border border-blue-50">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center border-b pb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          Filter Books
        </h2>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label htmlFor="title-search" className="block text-sm font-medium text-gray-700 mb-1">Search by Title</label>
            <form onSubmit={handleTitleSubmit} className="flex">
              <input
                type="text"
                id="title-search"
                value={inputTitle}
                onChange={handleTitleSearch}
                placeholder="Enter book title..."
                className="w-full p-3 border border-gray-300 rounded-lg rounded-r-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg rounded-l-none hover:bg-blue-700 transition-colors shadow-md flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>

          <div className="flex-1">
            <label htmlFor="genre-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Genre</label>
            <select
              id="genre-filter"
              value={selectedGenre}
              onChange={handleGenreChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.genreName}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="author-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Author</label>
            <select
              id="author-filter"
              value={selectedAuthor}
              onChange={handleAuthorChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">All Authors</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="publisher-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Publisher</label>
            <select
              id="publisher-filter"
              value={selectedPublisher}
              onChange={handlePublisherChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">All Publishers</option>
              {publishers.map(publisher => (
                <option key={publisher.id} value={publisher.id}>{publisher.publisherName}</option>
              ))}
            </select>
          </div>

          {(selectedGenre || selectedAuthor || selectedPublisher || searchTitle) && (
            <div className="flex items-end">
              <button 
                onClick={clearFilters}
                className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors shadow-md flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedGenre || selectedAuthor || selectedPublisher || searchTitle) && (
        <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
          <h3 className="text-lg font-semibold mb-2 text-gray-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Active Filters
          </h3>
          <div className="flex flex-wrap gap-2">
            {searchTitle && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Title: {searchTitle}
              </span>
            )}
            {selectedGenre && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Genre: {genres.find(g => g.id == selectedGenre)?.genreName || selectedGenre}
              </span>
            )}
            {selectedAuthor && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Author: {authors.find(a => a.id == selectedAuthor)?.name || selectedAuthor}
              </span>
            )}
            {selectedPublisher && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Publisher: {publishers.find(p => p.id == selectedPublisher)?.publisherName || selectedPublisher}
              </span>
            )}
          </div>
        </div>
      )}

      {books.length === 0 ? (
        <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-200 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-yellow-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-lg font-medium text-gray-700">No books found matching your criteria</p>
          <p className="text-gray-600 mt-2">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
              <div key={book.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-blue-50">
                <div className="flex flex-col mb-4">
                  <div className="relative mb-4 group">
                    <img
                      className="h-48 w-full object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                      src={book.imageUrl !== null ? book.imageUrl : "default-book-icon.png"}
                      alt={book.title}
                    />
                    <div className="absolute bottom-2 right-2 bg-yellow-400 text-gray-800 font-bold py-1 px-3 rounded-full shadow-md">
                      ${book.price.toFixed(2)}
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mb-3 text-blue-700 line-clamp-2">
                    {book.title}
                  </h2>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span className="font-medium">Authors:</span> 
                    <span className="ml-1 text-gray-600 truncate">{book.authorNames.join(', ')}</span>
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8V7H5v6h10z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Publisher:</span> 
                    <span className="ml-1 text-gray-600">{book.publisher}</span>
                  </p>
                </div>

                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => addToCart({
                      id: book.id,
                      title: book.title,
                      price: book.price,
                      quantity: 1
                    })}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Add to Cart
                  </button>

                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/books/${book.id}`} 
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      View Details
                    </Link>
                    {userIsAdmin && (
                      <div className="space-x-3">
                        <Link 
                          to={`/books/edit/${book.id}`} 
                          className="text-yellow-600 hover:text-yellow-800 font-medium flex items-center inline-flex"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(book.id)} 
                          className="text-red-600 hover:text-red-800 font-medium flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 bg-white p-4 rounded-xl shadow-md">
            <div className="text-sm text-gray-700 mb-4 md:mb-0">
              <span className="font-medium">Showing</span> {books.length} <span className="font-medium">of</span> {totalElements} <span className="font-medium">books</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  currentPage === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Previous
              </button>
              <div className="flex flex-wrap items-center gap-1">
                {(() => {
                  // Logic to show only 10 page numbers
                  const pageButtons = [];
                  let startPage, endPage;

                  if (totalPages <= 10) {
                    // If total pages are less than or equal to 10, show all pages
                    startPage = 0;
                    endPage = totalPages - 1;
                  } else {
                    // If current page is among the first 5 pages
                    if (currentPage < 5) {
                      startPage = 0;
                      endPage = 9;
                    } 
                    // If current page is among the last 5 pages
                    else if (currentPage >= totalPages - 5) {
                      startPage = totalPages - 10;
                      endPage = totalPages - 1;
                    } 
                    // If current page is in the middle
                    else {
                      startPage = currentPage - 4;
                      endPage = currentPage + 5;
                    }
                  }

                  // Create page buttons
                  for (let i = startPage; i <= endPage; i++) {
                    pageButtons.push(
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          currentPage === i
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors'
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
                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage === totalPages - 1}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  currentPage === totalPages - 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md'
                }`}
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Books;
