import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username,
        password
      });

      const userData = {
        username: response.data.username,
        role: response.data.role,
        token: response.data.token
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => user !== null;

  const hasRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${user?.token}` }
  });

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, hasRole, loading, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};