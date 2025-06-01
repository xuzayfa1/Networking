import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      const token = localStorage.getItem('AccessToken');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        if (isMounted) setUser(res.data);
      } catch (err) {
        if (isMounted) {
          setError(err);
          setUser(null);

          localStorage.removeItem('AccessToken');
          localStorage.removeItem('RefreshToken');

          // ❗ Faqat token mavjud bo‘lib, 401 bo‘lsa login sahifasiga yo‘naltir
          if (err.response?.status === 401) {
            navigate('/login');
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
