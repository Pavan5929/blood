import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userData } = useAuth();
  const location = useLocation();

  // If no user is logged in, redirect to login
  if (!userData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If allowedRoles is specified, check user role
  if (allowedRoles && !allowedRoles.includes(userData.role)) {
    // Redirect to appropriate dashboard based on user role
    switch(userData.role) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'acceptor':
        return <Navigate to="/acceptor" replace />;
      case 'donor':
      default:
        return <Navigate to="/donor" replace />;
    }
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string)
};

ProtectedRoute.defaultProps = {
  allowedRoles: null
};

export default ProtectedRoute;