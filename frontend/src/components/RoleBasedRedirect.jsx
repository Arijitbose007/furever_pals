import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useLocation } from 'react-router-dom';

const RoleBasedRedirect = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const namespace = import.meta.env.VITE_NAMESPACE;

  useEffect(() => {
    console.log('Namespace:', namespace);
    console.log('isLoading:', isLoading);
    console.log('isAuthenticated:', isAuthenticated);
    console.log('User:', user);

    if (isLoading) return; // Wait until the user data is fully loaded

    if (isAuthenticated) {
      const userRoles = user && user[`${namespace}roles`];
      console.log('User roles:', userRoles);

      if (userRoles && userRoles.includes('admin')) {
        // If user is admin, redirect to admin routes
        const adminRoutes = ['/adshelter', '/volshelter', '/sosshelter', '/shelter'];
        console.log('Admin detected, current path:', location.pathname);

        if (!adminRoutes.includes(location.pathname)) {
          console.log('Redirecting to /shelter');
          navigate('/shelter');
        }
      } else {
        // If user is not admin, allow access to public routes
        const publicRoutes = ['/volunteer','/buddies', '/sos', '/contactus', '/donate', '/adopt'];
        console.log('Non-admin detected, current path:', location.pathname);

        if (!publicRoutes.includes(location.pathname)) {
          console.log('Redirecting to /');
          navigate('/');
        }
      }
    }
  }, [isAuthenticated, isLoading, user, navigate, namespace, location.pathname]);

  return null; // This component does not render anything
};

export default RoleBasedRedirect;
