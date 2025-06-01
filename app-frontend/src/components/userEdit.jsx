import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import api from '../utils/api'; // ← axios o‘rniga api import qilindi

function UserEdit() {
  const { id } = useParams();
  const [user, setUser] = useState({
    username: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`); // ← api ishlatilmoqda
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/users/${id}`, user); // ← api ishlatilmoqda
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
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
            <h2 className="mb-0">Edit User #{id}</h2>
            <Link to="/users" className="btn btn-outline-secondary">Back to Users</Link>
          </div>

          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-bold">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="form-label fw-bold">Role</label>
                <select
                  className="form-select"
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  required
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Updating...' : 'Update User'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
