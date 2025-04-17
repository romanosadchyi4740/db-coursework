import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">Bookstore App</Link>
          <div className="flex space-x-4">
            <Link to="/books" className="hover:text-blue-200">Books</Link>
            <Link to="/authors" className="hover:text-blue-200">Authors</Link>
            <Link to="/publishers" className="hover:text-blue-200">Publishers</Link>
            <Link to="/customers" className="hover:text-blue-200">Customers</Link>
            <Link to="/orders" className="hover:text-blue-200">Orders</Link>
            <Link to="/reviews" className="hover:text-blue-200">Reviews</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar