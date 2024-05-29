import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const location = useLocation();
  const namespace = import.meta.env.VITE_NAMESPACE;

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  if (!isAuthenticated) {
    return <Navigate to="/adopt" state={{ from: location }} />;
  }

  const userRoles = user && user[`${namespace}roles`];

  if (requiredRole && (!userRoles || !userRoles.includes(requiredRole))) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
