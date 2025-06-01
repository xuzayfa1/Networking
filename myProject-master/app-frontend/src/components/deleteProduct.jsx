import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import Sidebar from './sidebar';
import { deleteProductById } from '../utils/api'; // axios o‘rniga

function DeleteProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteProductById(id);
      alert(`Order #${id} deleted!`);
      navigate('/');
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete the order.");
    }
  };

  return (
    <div className="d-flex vh-100" style={{ overflow: 'hidden' }}>
      {/* Sidebar */}
      <div
        className="bg-light"
        style={{ width: '250px', height: '100%', position: 'fixed', top: 0, left: 0, padding: '20px', borderRight: '1px solid #dee2e6' }} >
        <Sidebar/>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: '250px', padding: '20px', overflowY: 'auto' }}>
        <div className="container-fluid d-flex justify-content-center align-items-center h-100">
          <div className="card shadow-sm p-4" style={{ maxWidth: '500px', width: '100%' }}>
            <h2 className="text-center mb-4">Delete Order #{id}</h2>
            <p className="text-center mb-4">Are you sure you want to delete this order?</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;
