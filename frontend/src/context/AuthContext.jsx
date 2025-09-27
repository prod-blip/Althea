import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokens, setTokens] = useState(() => {
    const savedTokens = localStorage.getItem('authTokens');
    return savedTokens ? JSON.parse(savedTokens) : null;
  });

  // Check if user is already authenticated on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await apiRequest('/api/user/profile/');
      if (response.is_authenticated) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('User not authenticated');
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData, authTokens = null) => {
    setUser(userData);
    setIsAuthenticated(true);

    if (authTokens) {
      setTokens(authTokens);
      localStorage.setItem('authTokens', JSON.stringify(authTokens));
    }
  };

  const logout = async () => {
    try {
      await apiRequest('/api/auth/logout/', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setTokens(null);
      localStorage.removeItem('authTokens');
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    tokens,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};