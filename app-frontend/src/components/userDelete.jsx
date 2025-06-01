import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import api from '../utils/api'; // ← axios o‘rniga api import qilindi

function UserDelete() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`); // ← api ishlatilmoqda
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/users/${id}`); // ← api ishlatilmoqda
      alert(`User #${id} deleted!`);
      navigate('/users');
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete the user.');
    }
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;

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
        <div className="container-fluid d-flex justify-content-center align-items-center h-100">
          <div className="card shadow-sm p-4" style={{ maxWidth: '500px', width: '100%' }}>
            <h2 className="text-center mb-4">Delete User #{id}</h2>
            {user && (
              <p className="text-center mb-4">
                Are you sure you want to delete the user "{user.username}"?
              </p>
            )}
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn btn-secondary" onClick={() => navigate('/users')}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDelete;
