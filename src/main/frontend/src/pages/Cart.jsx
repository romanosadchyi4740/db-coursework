import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';
import { isAuthenticated, getToken } from '../services/authService';

const Cart = () => {
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
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
      
      const currentUser = getToken();
      
      const orderData = {
        customerId: currentUser.id,
        orderItems: cartItems.map(item => ({
          bookId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };
      
      await createOrder(orderData);
      clearCart();
      navigate('/');
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError('Failed to place order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <button 
            onClick={() => navigate('/books')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Browse Books
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-black">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Book</th>
                  <th className="text-center py-2">Price</th>
                  <th className="text-center py-2">Quantity</th>
                  <th className="text-center py-2">Total</th>
                  <th className="text-right py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4">${item.price.toFixed(2)}</td>
                    <td className="text-center py-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="w-16 text-center border rounded p-1 bg-gray-200 focus:outline-none focus:border-blue-500"
                      />
                    </td>
                    <td className="text-center py-4">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="text-right py-4">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/books')}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Continue Shopping
            </button>
            
            <div className="text-right">
              <p className="text-xl mb-2 text-black font-semibold">
                <span className="font-semibold text-black">Total:</span> ${totalPrice.toFixed(2)}
              </p>
              
              {checkoutError && (
                <p className="text-red-600 mb-2">{checkoutError}</p>
              )}
              
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`bg-green-600 text-white px-6 py-2 rounded ${
                  isCheckingOut ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
              >
                {isCheckingOut ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;