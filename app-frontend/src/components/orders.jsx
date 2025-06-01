import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import api from '../utils/api'; // ✅ Axios instance from api.js
import { format } from 'date-fns'; // ✅ Optional if used

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleFilter = () => {
    // TODO: Add filter logic here
    alert('Filter clicked (not implemented)');
  };

  const handleSort = () => {
    // TODO: Add sort logic here
    alert('Sort clicked (not implemented)');
  };

  return (
    <div className="d-flex vh-100" style={{ overflow: 'hidden' }}>
      {/* Sidebar */}
      <div className="bg-light" style={{
        width: '250px', height: '100%', position: 'fixed', top: 0, left: 0, padding: '20px',
        borderRight: '1px solid #dee2e6'
      }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: '250px', padding: '20px', overflowY: 'auto' }}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Orders</h2>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" onClick={handleFilter}>Filter</button>
              <button className="btn btn-outline-secondary" onClick={handleSort}>Sort</button>
              <Link to="/products" className="btn btn-outline-secondary">Back to Products</Link>
            </div>
          </div>

          {loading ? (
            <div className="p-4 text-center">
              <div className="spinner-border text-primary" role="status" />
              <div>Loading orders...</div>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : (
            <div className="table-responsive bg-white p-3 rounded shadow">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">No orders found.</td>
                    </tr>
                  ) : (
                    orders.map(order => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.product?.name || '—'}</td>
                        <td>{order.customer || '—'}</td>
                        <td>{format(new Date(order.date), 'dd MMM yyyy')}</td> {/* Or use toLocaleDateString() */}
                        <td>${order.amount?.toFixed(2) || '0.00'}</td>
                        <td>
                          <span className={`badge ${
                            order.status === 'Delivered' ? 'bg-success'
                              : order.status === 'Pending' ? 'bg-warning'
                              : 'bg-danger'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
