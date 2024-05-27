// src/components/ProtectedRoute.jsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth0();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/adopt" state={{ from: location }} />;
  }

  const userRoles = user && user['http://localhost:5173/roles'];

  if (requiredRole && (!userRoles || !userRoles.includes(requiredRole))) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
