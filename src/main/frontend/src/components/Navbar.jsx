import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated, signOut, isAnalyst } from '../services/authService';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userIsAnalyst, setUserIsAnalyst] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // Function to update authentication state
  const updateAuthState = () => {
    const authStatus = isAuthenticated();
    setAuthenticated(authStatus);
    if (authStatus) {
      setUserIsAnalyst(isAnalyst());
    } else {
      setUserIsAnalyst(false);
    }
  };

  // Initial check on component mount
  useEffect(() => {
    updateAuthState();

    // Listen for auth-change events
    window.addEventListener('auth-change', updateAuthState);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('auth-change', updateAuthState);
    };
  }, []);

  const handleSignOut = () => {
    signOut();
    // No need to manually set state here as the auth-change event will trigger updateAuthState
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-bookstore-primary via-bookstore-secondary to-bookstore-primary text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm border-b border-bookstore-accent">
      <div className="container-elegant">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="text-2xl font-bold font-serif flex items-center group"
          >
            <div className="bg-white bg-opacity-20 p-3 rounded-xl mr-3 group-hover:bg-opacity-30 group-hover:scale-110 transition-all duration-300 shadow-book">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <span className="text-gradient-gold font-bold">Bookstore</span>
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/books"
              className="nav-link font-medium hover:text-bookstore-gold"
            >
              Books
            </Link>
            <Link
              to="/authors"
              className="nav-link font-medium hover:text-bookstore-gold"
            >
              Authors
            </Link>
            <Link
              to="/publishers"
              className="nav-link font-medium hover:text-bookstore-gold"
            >
              Publishers
            </Link>
            {userIsAnalyst && (
              <>
                <Link
                  to="/customers"
                  className="nav-link font-medium hover:text-bookstore-gold"
                >
                  Customers
                </Link>
                <Link
                  to="/orders"
                  className="nav-link font-medium hover:text-bookstore-gold"
                >
                  Orders
                </Link>
              </>
            )}
            <Link to="/cart" className="nav-link font-medium relative group">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 group-hover:text-bookstore-gold transition-colors duration-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Cart
              </div>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-bookstore-gold to-bookstore-copper text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse-slow">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {authenticated && (
              <Link
                to="/order-history"
                className="nav-link font-medium hover:text-bookstore-gold"
              >
                My Orders
              </Link>
            )}
            {authenticated ? (
              <button
                onClick={handleSignOut}
                className="nav-link font-medium hover:text-bookstore-gold transition-colors duration-200"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex space-x-4 items-center">
                <Link
                  to="/sign-in"
                  className="nav-link font-medium hover:text-bookstore-gold transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="btn-secondary font-medium text-bookstore-primary bg-white border-white hover:bg-transparent hover:text-white hover:shadow-brown-glow transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-bookstore-gold transition-colors duration-200 p-2 rounded-lg hover:bg-white hover:bg-opacity-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;