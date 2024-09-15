import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // To store user role
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for authentication state on initial render
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('role'); // Get stored role
    if (storedAuth === 'true' && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
      navigate(`/${storedRole}-dashboard`); // Redirect to the role-specific dashboard
    }
  }, [navigate]);

  const login = (userRole) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', userRole); // Store the user role
    setIsAuthenticated(true);
    setRole(userRole);
    navigate(`/${userRole}-dashboard`); // Redirect to the role-specific dashboard
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role'); // Remove stored role
    setIsAuthenticated(false);
    setRole(null);
    navigate('/'); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
