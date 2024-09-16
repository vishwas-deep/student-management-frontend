import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const role = localStorage.getItem('role');

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Define role-based path redirection
  if (role) {
    const validRoles = ['admin', 'student', 'teacher'];
    const isValidRole = validRoles.includes(role);

    if (!isValidRole) {
      // Redirect to home if role is not valid
      return <Navigate to="/" />;
    }

    // Ensure user can only access URLs corresponding to their role
    if (!location.pathname.startsWith(`/${role}`)) {
      return <Navigate to={`/${role}/dashboard`} />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
