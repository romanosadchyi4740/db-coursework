import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrderHistory } from '../services/orderService';
import { isAuthenticated, getUserId } from '../services/authService';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/sign-in', { state: { from: '/order-history' } });
      return;
    }

    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        const customerId = getUserId();
        if (!customerId) {
          throw new Error('User ID not found');
        }
        
        const data = await getOrderHistory(customerId);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch order history:', err);
        setError('Failed to fetch order history. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [navigate]);

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">You haven't placed any orders yet</p>
          <button 
            onClick={() => navigate('/books')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Browse Books
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Order #{order.id}</h2>
                <div className="text-right">
                  <p className="text-gray-600">
                    <span className="font-semibold">Date:</span> {formatDate(order.paymentDate)}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Total:</span> ${order.amount.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Items</h3>
                <table className="w-full text-gray-600 border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Book</th>
                      <th className="text-center py-2">Price</th>
                      <th className="text-center py-2">Quantity</th>
                      <th className="text-right py-2">Sub-total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map(item => (
                      <tr key={item.id} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center">
                            <div>
                              <h3 className="font-semibold">{item.bookTitle}</h3>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-4">${item.price.toFixed(2)}</td>
                        <td className="text-center py-4">{item.quantity}</td>
                        <td className="text-right py-4">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {orders.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => navigate('/books')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;