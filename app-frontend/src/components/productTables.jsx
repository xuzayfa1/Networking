import React, { useState, useEffect, useMemo } from 'react';
import api from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from './sidebar';
import DeleteProduct from './deleteProduct';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products');
        console.log('API Response:', response.data);
        setProducts(Array.isArray(response.data) ? response.data : response.data.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sorting logic
  const sortedProducts = useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig.key) {
      sortableProducts.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle numeric fields (price, sales, revenue, stock)
        if (['price', 'sales', 'revenue', 'stock'].includes(sortConfig.key)) {
          aValue = Number(aValue) || 0;
          bValue = Number(bValue) || 0;
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Pagination logic
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Delete confirmation
  const handleDeleteClick = (product) => {
    
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await api.delete(`/products/${productToDelete.id}`);
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

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
            <h3 className="mb-0">Products</h3>
            <Link to="/add-product" className="btn btn-primary">Add Product</Link>
          </div>

          {products.length === 0 ? (
            <div className="alert alert-info text-center">No products found.</div>
          ) : (
            <>
              {/* Product Table */}
              <div className="table-responsive bg-white p-3 rounded shadow">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>
                        Product {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                      </th>
                      <th onClick={() => requestSort('price')} style={{ cursor: 'pointer' }}>
                        Price {sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                      </th>
                      <th onClick={() => requestSort('sales')} style={{ cursor: 'pointer' }}>
                        Sales {sortConfig.key === 'sales' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                      </th>
                      <th onClick={() => requestSort('revenue')} style={{ cursor: 'pointer' }}>
                        Revenue {sortConfig.key === 'revenue' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                      </th>
                      <th onClick={() => requestSort('stock')} style={{ cursor: 'pointer' }}>
                        Stock {sortConfig.key === 'stock' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                      </th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.map((product) => (
                      <tr key={product.id || product.name}>
                        <td>{product.name}</td>
                        <td>${Number(product.price).toFixed(2)}</td>
                        <td>{product.sales || 0} pcs</td>
                        <td>${Number(product.revenue || 0).toFixed(2)}</td>
                        <td>{product.stock || 0}</td>
                        <td>
                          <span
                            className={`badge ${
                              product.status === 'In Stock'
                                ? 'bg-success'
                                : product.status === 'Out of Stock'
                                ? 'bg-danger'
                                : 'bg-warning'
                            }`}
                          >
                            {product.status || 'In Stock'}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => navigate(`/edit/${product.id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => navigate(`/delete/${product.id}`)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <span className="me-2">Items per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="form-select form-select-sm d-inline-block"
                    style={{ width: 'auto' }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <div>
                  <span className="me-2">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                    {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
                  </span>
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages).keys()].map((page) => (
                    <button
                      key={page + 1}
                      className={`btn btn-sm me-1 ${
                        currentPage === page + 1 ? 'btn-primary' : 'btn-outline-secondary'
                      }`}
                      onClick={() => handlePageChange(page + 1)}
                    >
                      {page + 1}
                    </button>
                  ))}
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeleteModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete the product "{productToDelete?.name}"?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;