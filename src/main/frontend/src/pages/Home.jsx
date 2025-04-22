import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Welcome to the Bookstore</h1>
      <p className="text-xl mb-8 text-black">Explore our collection of books, authors, and more.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-3 text-blue-600">Books</h2>
          <p className="mb-4 text-black">Browse our extensive collection of books across various genres.</p>
          <Link to="/books" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Books
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-3 text-blue-600">Authors</h2>
          <p className="mb-4 text-black">Discover talented authors and their published works.</p>
          <Link to="/authors" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Authors
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-3 text-blue-600">Publishers</h2>
          <p className="mb-4 text-black">Learn about the publishers behind your favorite books.</p>
          <Link to="/publishers" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Publishers
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home