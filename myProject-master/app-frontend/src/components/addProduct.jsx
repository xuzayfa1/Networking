import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import api from '../utils/api';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    status: 'In Stock',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/add-product', product); // Adjust endpoint based on your backend
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };


return (
    <div className="d-flex vh-100" style={{ overflow: 'hidden' }}>
      {/* Sidebar */}
      <div
        className="bg-light"
        style={{
          width: '250px',
          height: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          padding: '20px',
          borderRight: '1px solid #dee2e6',
        }}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: '250px', padding: '20px', overflowY: 'auto' }}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Add New Product</h2>
            <Link to="/" className="btn btn-outline-secondary">Back to Products</Link>
          </div>

          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label fw-bold">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label fw-bold">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="productPrice"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productStock" className="form-label fw-bold">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  id="productStock"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="productStatus" className="form-label fw-bold">Status</label>
                <select
                  className="form-select"
                  id="productStatus"
                  name="status"
                  value={product.status}
                  onChange={handleChange}
                  required
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Restock">Restock</option>
                  <option value="Available">Available</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddProduct;