import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';
import { isAuthenticated, getUsername } from '../services/authService';
import Popup from '../components/Popup';

const Cart = () => {
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, parseInt(newQuantity));
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated()) {
      navigate('/sign-in', { state: { from: '/cart' } });
      return;
    }

    if (cartItems.length === 0) {
      setCheckoutError('Your cart is empty');
      return;
    }

    try {
      setIsCheckingOut(true);
      setCheckoutError(null);

      const currentUser = getUsername();

      const orderData = {
        customerName: currentUser,
        orderItems: cartItems.map((item) => ({
          bookId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      console.log(orderData);
      await createOrder(orderData);
      setOrderTotal(totalPrice);
      clearCart();
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError(
        'Failed to place order. Please try again. Error: ' +
          error.response?.data
      );
      setTimeout(() => {
        setCheckoutError(null);
      }, 5000);
      throw new Error(
        'Failed to place order. Please try again.' + error.message
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    navigate('/');
  };

  return (
    <div className="container-elegant section-padding">
      <div className="animate-fade-in">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-br from-bookstore-primary to-bookstore-secondary p-3 rounded-full mr-4 shadow-book">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gradient font-serif">
              Shopping Cart
            </h1>
            <p className="text-bookstore-secondary text-lg">
              Review your items and proceed to checkout
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="card-glass text-center py-16">
            <div className="text-bookstore-accent text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-semibold mb-4 text-gradient font-serif">
              Your cart is empty
            </h2>
            <p className="text-bookstore-secondary text-lg mb-8">
              Start shopping to add some amazing books to your cart!
            </p>
            <button
              onClick={() => navigate('/books')}
              className="btn-primary inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              Browse Books
            </button>
          </div>
        ) : (
          <>
            <div className="card-glass mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-bookstore-accent">
                      <th className="text-left py-4 px-4 font-semibold text-bookstore-primary">
                        Book
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-bookstore-primary">
                        Price
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-bookstore-primary">
                        Quantity
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-bookstore-primary">
                        Total
                      </th>
                      <th className="text-right py-4 px-4 font-semibold text-bookstore-primary">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-bookstore-lighter hover:bg-bookstore-lighter transition-colors"
                      >
                        <td className="py-6 px-4">
                          <div className="flex items-center">
                            <div className="bg-gradient-to-br from-bookstore-accent to-bookstore-gold p-2 rounded-lg mr-4 shadow-book">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-semibold text-bookstore-dark text-lg">
                                {item.title}
                              </h3>
                              <p className="text-bookstore-secondary text-sm">
                                Book ID: {item.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-6 px-4">
                          <span className="text-bookstore-primary font-semibold text-lg">
                            ${item.price.toFixed(2)}
                          </span>
                        </td>
                        <td className="text-center py-6 px-4">
                          <div className="flex items-center justify-center">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item.id, e.target.value)
                              }
                              className="w-20 text-center border border-bookstore-accent rounded-lg p-2 bg-white focus:outline-none focus:border-bookstore-primary focus:ring-2 focus:ring-bookstore-primary focus:ring-opacity-50 transition-all"
                            />
                          </div>
                        </td>
                        <td className="text-center py-6 px-4">
                          <span className="text-bookstore-primary font-bold text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </td>
                        <td className="text-right py-6 px-4">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-bookstore-error hover:text-red-800 font-medium flex items-center justify-end w-full transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-glass">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <button
                  onClick={() => navigate('/books')}
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
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Continue Shopping
                </button>

                <div className="text-right">
                  <div className="bg-gradient-to-r from-bookstore-lighter to-white p-6 rounded-xl border border-bookstore-light mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-bookstore-secondary font-medium">
                        Subtotal:
                      </span>
                      <span className="text-bookstore-dark font-semibold">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-bookstore-secondary font-medium">
                        Shipping:
                      </span>
                      <span className="text-bookstore-success font-semibold">
                        Free
                      </span>
                    </div>
                    <div className="border-t border-bookstore-light pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-bookstore-primary">
                          Total:
                        </span>
                        <span className="text-2xl font-bold text-gradient">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {checkoutError && (
                    <div className="bg-bookstore-error bg-opacity-10 border border-bookstore-error text-bookstore-error px-4 py-3 rounded-lg mb-4">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {checkoutError}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className={`w-full flex items-center justify-center ${
                      isCheckingOut
                        ? 'bg-bookstore-lighter text-bookstore-secondary cursor-not-allowed px-6 py-3 rounded-lg'
                        : 'btn-success'
                    }`}
                  >
                    {isCheckingOut ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
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
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Proceed to Checkout
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {showSuccessPopup && (
        <Popup
          isOpen={showSuccessPopup}
          title="Order Placed Successfully!"
          message={`Thank you for your order! Your books are being prepared for shipment. Order total: $${orderTotal.toFixed(
            2
          )}. You can track your order in your order history.`}
          type="success"
          onClose={handlePopupClose}
          autoClose={false}
        />
      )}
    </div>
  );
};

export default Cart;
