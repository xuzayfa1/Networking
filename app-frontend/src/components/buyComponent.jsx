import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import api from '../utils/api';  

function BuyProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products');  
        setProducts(Array.isArray(response.data) ? response.data : response.data.data || []);
      } catch (err) {
        setError(err.message || 'Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (id, quantity) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [id]: Math.max(0, Number(quantity) || 0),
    }));
  };

  const getTotalPrice = () => {
    return Object.keys(selectedProducts).reduce((total, id) => {
      const product = products.find((p) => p.id === Number(id));
      return total + (product?.price * (selectedProducts[id] || 0) || 0);
    }, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      const purchaseData = Object.keys(selectedProducts).map((id) => ({
        productId: Number(id),
        quantity: selectedProducts[id],
        customer: localStorage.getItem('userName') || 'Anonymous',
      }));

      console.log('Checkout data:', purchaseData);

      const response = await Promise.all(
        purchaseData.map((data) =>
          api.post('/create/order', data)  
        )
      );

      console.log('Checkout response:', response);
      alert(`Total: $${getTotalPrice()}. Purchase completed successfully!`);
      setSelectedProducts({});
    } catch (error) {
      console.error('Checkout failed:', error.response?.data || error.message);
      alert('Failed to complete purchase. Please try again.');
    }
  };

  if (loading) return <div className="text-center my-5">Loading products...</div>;
  if (error) return <div className="alert alert-danger my-5">{error}</div>;

  return (
    <div className="d-flex vh-100" style={{ overflow: 'hidden' }}>
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

      <div className="flex-grow-1" style={{ marginLeft: '250px', padding: '20px', overflowY: 'auto' }}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Buy Products</h2>
          </div>

          {products.length === 0 ? (
            <div className="alert alert-info text-center">No products available for purchase.</div>
          ) : (
            <>
              <div className="table-responsive bg-white p-3 rounded shadow mb-4">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>${Number(product.price).toFixed(2)}</td>
                        <td>{product.stock || 0}</td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm w-50"
                            min="0"
                            max={product.stock}
                            value={selectedProducts[product.id] || 0}
                            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="card shadow-sm p-4">
                <h4 className="mb-3">Order Summary</h4>
                <p className="mb-3">Total: <strong>${getTotalPrice()}</strong></p>
                <button
                  className="btn btn-success w-100"
                  onClick={handleCheckout}
                  disabled={Object.values(selectedProducts).every((qty) => qty === 0)}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuyProducts;
