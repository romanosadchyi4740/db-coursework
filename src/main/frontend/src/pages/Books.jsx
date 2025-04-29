import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getPaginatedBooks, 
  deleteBook, 
  downloadBooks, 
  getBooksByGenre, 
  getBooksByAuthor, 
  getBooksByPublisher,
  getBooksByTitle
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
  const [activeFilter, setActiveFilter] = useState(null); // 'genre', 'author', 'publisher', 'title', or null

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

  // Fetch books based on active filter
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let data;

        if (activeFilter === 'genre' && selectedGenre) {
          data = await getBooksByGenre(selectedGenre, currentPage, pageSize);
        } else if (activeFilter === 'author' && selectedAuthor) {
          data = await getBooksByAuthor(selectedAuthor, currentPage, pageSize);
        } else if (activeFilter === 'publisher' && selectedPublisher) {
          data = await getBooksByPublisher(selectedPublisher, currentPage, pageSize);
        } else if (activeFilter === 'title' && searchTitle) {
          data = await getBooksByTitle(searchTitle, currentPage, pageSize);
        } else {
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
  }, [currentPage, pageSize, activeFilter, selectedGenre, selectedAuthor, selectedPublisher, searchTitle]);

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
    setSelectedAuthor('');
    setSelectedPublisher('');
    setCurrentPage(0);
    setActiveFilter(genreId ? 'genre' : null);
  };

  const handleAuthorChange = (e) => {
    const authorId = e.target.value;
    setSelectedAuthor(authorId);
    setSelectedGenre('');
    setSelectedPublisher('');
    setCurrentPage(0);
    setActiveFilter(authorId ? 'author' : null);
  };

  const handlePublisherChange = (e) => {
    const publisherId = e.target.value;
    setSelectedPublisher(publisherId);
    setSelectedGenre('');
    setSelectedAuthor('');
    setCurrentPage(0);
    setActiveFilter(publisherId ? 'publisher' : null);
  };

  const handleTitleSearch = (e) => {
    const title = e.target.value;
    setInputTitle(title);
  };

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    setSearchTitle(inputTitle);
    setSelectedGenre('');
    setSelectedAuthor('');
    setSelectedPublisher('');
    setCurrentPage(0);
    setActiveFilter(inputTitle ? 'title' : null);
  };

  const clearFilters = () => {
    setSelectedGenre('');
    setSelectedAuthor('');
    setSelectedPublisher('');
    setInputTitle('');
    setSearchTitle('');
    setActiveFilter(null);
    setCurrentPage(0);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  const userIsAdmin = isAdmin();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Books</h1>
        <div className="flex space-x-2">
          <button onClick={() => handleDownload()} className="text-blue-600 hover:text-blue-800">Download Books</button>
          {userIsAdmin && (
            <Link 
              to="/books/new" 
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add New Book
            </Link>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
          <div className="flex-1">
            <label htmlFor="title-search" className="block text-sm font-medium text-gray-700 mb-1">Search by Title</label>
            <form onSubmit={handleTitleSubmit} className="flex">
              <input
                type="text"
                id="title-search"
                value={inputTitle}
                onChange={handleTitleSearch}
                placeholder="Enter book title..."
                className="w-full p-2 border border-gray-300 rounded-md rounded-r-none"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md rounded-l-none hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>

          <div className="flex-1">
            <label htmlFor="genre-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Genre</label>
            <select
              id="genre-filter"
              value={selectedGenre}
              onChange={handleGenreChange}
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Publishers</option>
              {publishers.map(publisher => (
                <option key={publisher.id} value={publisher.id}>{publisher.publisherName}</option>
              ))}
            </select>
          </div>

          {activeFilter && (
            <div className="flex items-end">
              <button 
                onClick={clearFilters}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {books.length === 0 ? (
        <p className="text-center py-10">No books found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
              <div key={book.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-[5px]">
                  <img
                    className="h-32 object-cover rounded-lg"
                    src={book.imageUrl !== null ? book.imageUrl : "default-book-icon.png"}
                    alt=""
                  />

                  <h2 className="text-xl font-semibold mb-2 text-black bg-gray-200 rounded-[5px] p-[10px] shadow-lg">
                    {book.title}
                  </h2>
                </div>

                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Authors:</span> {book.authorNames.join(', ')}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Publisher:</span> {book.publisher}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Price:</span> ${book.price.toFixed(2)}
                </p>
                <button
                  onClick={() => addToCart({
                    id: book.id,
                    title: book.title,
                    price: book.price,
                    quantity: 1
                  })}
                  className="bg-blue-600 text-white px-3 py-1 rounded mb-3 hover:bg-blue-700 w-full"
                >
                  Add to Cart
                </button>
                <div className="flex justify-between">
                  <Link 
                    to={`/books/${book.id}`} 
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </Link>
                  {userIsAdmin && (
                    <div className="space-x-2">
                      <Link 
                        to={`/books/edit/${book.id}`} 
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(book.id)} 
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

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-8">
            <div className="text-sm text-gray-700">
              Showing {books.length} of {totalElements} books
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className={`px-3 py-1 rounded ${
                  currentPage === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Previous
              </button>
              <div className="flex items-center space-x-1">
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
                        className={`px-3 py-1 rounded ${
                          currentPage === i
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages - 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Books;
