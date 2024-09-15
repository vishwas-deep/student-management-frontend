import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated } = useAuth(); // Get authentication status from context
  const location = useLocation(); // Get the current URL

  // Determine the redirect path based on authentication status
  let redirectPath = '/';
  if (isAuthenticated) {
    const role = localStorage.getItem('role'); // Get user role from localStorage or context
    redirectPath = `/${role}-dashboard`; // Redirect to the appropriate dashboard
  }

  // If not authenticated or role mismatch, redirect to the appropriate path
  return isAuthenticated || location.pathname === '/' ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} />
  );
};

export default ProtectedRoute;
