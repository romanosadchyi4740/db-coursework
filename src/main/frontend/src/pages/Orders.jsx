import React, { useState, useEffect } from 'react';
import { getAllOrders, downloadOrders } from '../services/orderService';
import { isAnalyst } from '../services/authService';
import { useNavigate } from 'react-router-dom';
// Import Recharts components
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'graph'
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is analyst, if not redirect to home
    if (!isAnalyst()) {
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.');
        setLoading(false);
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, [navigate]);

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format price to display with currency symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  // Prepare data for the graph visualization
  const prepareGraphData = () => {
    // Group orders by date (month and year)
    const groupedByDate = orders.reduce((acc, order) => {
      const date = new Date(order.paymentDate);
      const monthYear = `${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`;

      if (!acc[monthYear]) {
        acc[monthYear] = {
          name: monthYear,
          totalAmount: 0,
          count: 0
        };
      }

      acc[monthYear].totalAmount += order.amount;
      acc[monthYear].count += 1;

      return acc;
    }, {});

    // Convert to array format for Recharts
    return Object.values(groupedByDate).sort((a, b) => {
      const [aMonth, aYear] = a.name.split(' ');
      const [bMonth, bYear] = b.name.split(' ');

      const yearDiff = parseInt(aYear) - parseInt(bYear);
      if (yearDiff !== 0) return yearDiff;

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.indexOf(aMonth) - months.indexOf(bMonth);
    });

  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Orders</h1>

        {/* View toggle buttons and download button */}
        {orders.length > 0 && (
          <div className="flex space-x-2">
            {/* Download button */}
            <button
              onClick={() => downloadOrders()}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 mr-2"
            >
              Download Orders
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('graph')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'graph'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Graph View
            </button>
          </div>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-700">No orders found.</p>
      ) : viewMode === 'table' ? (
        // Table View
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-gray-800">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Date</th>
                {/*<th className="py-3 px-4 text-left">Status</th>*/}
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Items</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">
                    {order.customerName ? `${order.customerName}` : 'N/A'}
                  </td>
                  <td className="py-3 px-4">{formatDate(order.paymentDate)}</td>
                  {/*<td className="py-3 px-4">*/}
                  {/*  <span className={`px-2 py-1 rounded-full text-xs ${*/}
                  {/*    order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :*/}
                  {/*    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :*/}
                  {/*    order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :*/}
                  {/*    'bg-blue-100 text-blue-800'*/}
                  {/*  }`}>*/}
                  {/*    {order.status}*/}
                  {/*  </span>*/}
                  {/*</td>*/}
                  <td className="py-3 px-4">{formatPrice(order.amount)}</td>
                  <td className="py-3 px-4">
                    {order.orderItems ? order.orderItems.length : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Graph View
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Orders by Month</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={prepareGraphData()}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip formatter={(value, name) => {
                  if (name === 'Total Amount') {
                    return [formatPrice(value), 'Total Amount'];
                  }
                  return [value, 'Number of Orders'];
                }} />
                <Legend />
                <Bar yAxisId="left" dataKey="totalAmount" name="Total Amount" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="count" name="Number of Orders" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
