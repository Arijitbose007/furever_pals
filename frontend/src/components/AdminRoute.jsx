// src/components/AdminRoute.jsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const location = useLocation();
  const namespace = import.meta.env.VITE_NAMESPACE;
  const userRoles = user && user[`${namespace}roles`];

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (!userRoles || !userRoles.includes('admin')) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
