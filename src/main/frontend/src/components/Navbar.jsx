import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { isAuthenticated, signOut } from '../services/authService'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  const handleSignOut = () => {
    signOut();
    setAuthenticated(false);
    navigate('/');
  };

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
            <Link to="/cart" className="hover:text-blue-200 relative">
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {authenticated && (
              <Link to="/order-history" className="hover:text-blue-200">
                My Orders
              </Link>
            )}

            {authenticated ? (
              <button 
                onClick={handleSignOut} 
                className="hover:text-blue-200"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link to="/sign-in" className="hover:text-blue-200">Sign In</Link>
                <Link to="/sign-up" className="hover:text-blue-200">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
