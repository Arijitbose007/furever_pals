import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const location = useLocation();
  const namespace = import.meta.env.VITE_NAMESPACE;

  console.log('Namespace:', namespace);
  console.log('isLoading:', isLoading);
  console.log('isAuthenticated:', isAuthenticated);
  console.log('User:', user);

  const userRoles = user && user[`${namespace}roles`];
  console.log('User roles:', userRoles);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading message while the user data is being fetched
  }

  if (!isAuthenticated) {
    console.log('User is not authenticated. Redirecting to home.');
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (!userRoles || !userRoles.includes('admin')) {
    console.log('User does not have admin role. Redirecting to home.');
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default AdminRoute;
