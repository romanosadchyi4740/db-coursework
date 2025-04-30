import React, { useState, useEffect } from 'react';
import { getAllCustomers } from '../services/customerService';
import { isAnalyst } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is analyst, if not redirect to home
    if (!isAnalyst()) {
      navigate('/');
      return;
    }

    const fetchCustomers = async () => {
      try {
        const data = await getAllCustomers();
        setCustomers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch customers. Please try again later.');
        setLoading(false);
        console.error('Error fetching customers:', err);
      }
    };

    fetchCustomers();
  }, [navigate]);

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
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Customers</h1>
      
      {customers.length === 0 ? (
        <p className="text-gray-700">No customers found.</p>
      ) : (
        <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
          {customers.map((customer) => (
            <li key={customer.id} className="p-4 hover:bg-gray-50">
              <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">{customer.username}</h2>
                  <p className="text-gray-500">Email: {customer.email || 'N/A'}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Customers;