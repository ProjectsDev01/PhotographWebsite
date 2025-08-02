// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [username, setUsername] = useState(() => localStorage.getItem('username') || null);

  // Przy logowaniu zapisujemy token i username
  const login = async (name, password) => {
    try {
      const res = await axios.post('/api/auth/login', { name, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setToken(res.data.token);
      setUsername(res.data.username);
      navigate('/admin');
    } catch (err) {
      alert('Błąd logowania');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUsername(null);
    navigate('/login');
  };

  // Przy starcie aplikacji ustawiamy auth header, jeśli mamy token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
