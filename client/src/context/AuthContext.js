import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const { data } = await axios.get('/api/auth/profile');
          setUser(data);
        } catch (error) {
          console.error("Token inválido, cerrando sesión.");
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({ _id: data._id, name: data.name, email: data.email });
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post('/api/auth/register', { name, email, password });
    
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({ _id: data._id, name: data.name, email: data.email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);