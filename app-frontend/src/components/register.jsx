import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/api'; // ✅ use your API helper

const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [prePassword, setPrePassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      username: userName,
      password,
      prePassword,
    };

    try {
      const response = await register(payload); // ✅ from utils/api.js

      if (response.data.success) {
        alert(`${response.data.message} Ro'yxatdan o'tish muvaffaqiyatli!`);
        navigate('/login');
      } else {
        setError(response.data.message || 'Xatolik yuz berdi.');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Server xatosi yuz berdi.');
      } else {
        setError('Tarmoq xatosi yoki serverga ulanib bo‘lmadi.');
      }
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
    },
    card: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '420px',
      color: '#222',
    },
    title: {
      marginBottom: '25px',
      fontWeight: '700',
      fontSize: '2rem',
      textAlign: 'center',
      color: '#222',
      letterSpacing: '1.2px',
    },
    inputGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontWeight: '600',
      color: '#444',
      fontSize: '0.9rem',
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      borderRadius: '8px',
      border: '2px solid #ddd',
      fontSize: '1rem',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '14px',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: '#000DFF',
      color: '#fff',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#2525D6',
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#842029',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontWeight: '600',
      fontSize: '0.9rem',
      textAlign: 'center',
    },
    footerText: {
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '0.9rem',
      color: '#555',
    },
    link: {
      color: '#000DFF',
      fontWeight: '600',
      textDecoration: 'none',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Ro'yxatdan o'tish</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>Foydalanuvchi nomi</label>
            <input
              id="username"
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Parol</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="prepassword" style={styles.label}>Parolni takrorlang</label>
            <input
              id="prepassword"
              type="password"
              value={prePassword}
              onChange={e => setPrePassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button
            type="submit"
            style={isBtnHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
          >
            Ro'yxatdan o'tish
          </button>
        </form>
        <p style={styles.footerText}>
          Hisobingiz bormi?{' '}
          <a href="/login" style={styles.link}>
            Kirish
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
